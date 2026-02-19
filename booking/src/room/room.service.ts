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
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';

interface AddressServiceGrpc {
  isValidWard(data: { code: number }): Observable<{ isValid: boolean }>;
  isValidHistoricalWard(data: {
    code: number;
  }): Observable<{ isValid: boolean }>;
}

@Injectable()
export class RoomService {
  private addressService: AddressServiceGrpc;

  constructor(
    private readonly repo: RoomRepository,
    @Inject('ADDRESS_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.addressService =
      this.client.getService<AddressServiceGrpc>('AddressService');
  }

  async create(dto: CreateRoomDto) {
    const { wardCode, historicalWardCode } = dto;

    // Validating against Historical Ward because we are using the Historical Address system
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
        throw new BadRequestException(
          `historicalWardCode ${historicalWardCode} không tồn tại`,
        );
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
    return room;
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
