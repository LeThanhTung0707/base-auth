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

    const wardRes = await firstValueFrom(
      this.addressService.isValidWard({ code: wardCode }),
    );
    if (!wardRes.isValid) {
      throw new BadRequestException(`wardCode ${wardCode} không tồn tại`);
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

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const room = await this.repo.findById(id);
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  update(id: string, dto: UpdateRoomDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
