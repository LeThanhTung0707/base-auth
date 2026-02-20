import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

interface AddressServiceGrpc {
  isValidWard(data: { code: number }): Observable<{ isValid: boolean }>;
  isValidHistoricalWard(data: { code: number }): Observable<{ isValid: boolean }>;
}

interface UserServiceGrpc {
  getUser(data: { id: string }): Observable<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
}

@Injectable()
export class RoomService {
  private addressService: AddressServiceGrpc;
  private userService: UserServiceGrpc;

  constructor(
    private readonly repo: RoomRepository,
    @Inject('ADDRESS_SERVICE') private addressClient: ClientGrpc,
    @Inject('USER_SERVICE') private userClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.addressService = this.addressClient.getService<AddressServiceGrpc>('AddressService');
    this.userService = this.userClient.getService<UserServiceGrpc>('UserService');
  }

  async create(dto: CreateRoomDto) {
    const { wardCode, historicalWardCode } = dto;

    const wardRes = await firstValueFrom(
      this.addressService.isValidHistoricalWard({ code: wardCode }),
    );
    if (!wardRes.isValid) {
      throw new BadRequestException(`wardCode ${wardCode} không tồn tại (trong dữ liệu cũ)`);
    }

    if (historicalWardCode) {
      const historicalRes = await firstValueFrom(
        this.addressService.isValidHistoricalWard({ code: historicalWardCode }),
      );
      if (!historicalRes.isValid) {
        throw new BadRequestException(`historicalWardCode ${historicalWardCode} không tồn tại`);
      }
    }

    return this.repo.create(dto);
  }

  findAll(category?: string, ownerId?: string) {
    return this.repo.findAll(category, ownerId);
  }

  async findOne(id: string) {
    const room = await this.repo.findById(id);
    if (!room) throw new NotFoundException('Room not found');

    // Fetch owner info via gRPC
    let owner: { id: string; email: string; firstName: string; lastName: string; avatar: string } | null = null;
    try {
      const userRes = await firstValueFrom(
        this.userService.getUser({ id: room.ownerId }),
      );
      // Only attach if user was found (non-empty id returned)
      if (userRes?.id) {
        owner = userRes;
      }
    } catch {
      // Owner info is best-effort; don't fail the room fetch
    }

    return { ...room, owner };
  }

  update(id: string, dto: UpdateRoomDto) {
    return this.repo.update(id, dto);
  }

  updateImages(id: string, images: string[]) {
    return this.repo.updateImages(id, images);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
