import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersGrpcController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser({ id }: { id: string }) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
      };
    }
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      avatar: user.avatar ?? '',
    };
  }
}
