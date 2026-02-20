import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCsrfGuard } from '../auth/guards/auth-csrf.guard';
import { User } from '../common/decorators/user.decorator';

class UpdateProfileDto {
  firstName?: string;
  lastName?: string;
}

class UpdateAvatarDto {
  avatarUrl!: string;
}

@Controller('users')
@UseGuards(AuthCsrfGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@User() user: { sub: string }) {
    const u = await this.usersService.findById(user.sub);
    if (!u) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = u;
    return rest;
  }

  @Patch('me')
  async updateProfile(
    @User() user: { sub: string },
    @Body() dto: UpdateProfileDto,
  ) {
    const u = await this.usersService.updateProfile(user.sub, {
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = u;
    return rest;
  }

  @Patch('me/avatar')
  async updateAvatar(
    @User() user: { sub: string },
    @Body() dto: UpdateAvatarDto,
  ) {
    const u = await this.usersService.updateAvatar(user.sub, dto.avatarUrl);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = u;
    return rest;
  }
}
