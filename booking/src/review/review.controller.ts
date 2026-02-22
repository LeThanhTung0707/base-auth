import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller()
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('rooms/:roomId/reviews')
  @UseGuards(AuthGuard)
  createReview(
    @Param('roomId') roomId: string,
    @Body() dto: CreateReviewDto,
    @User() user: { sub: string },
  ) {
    return this.reviewService.createReview(
      roomId,
      dto.bookingId,
      user.sub,
      dto.rating,
      dto.comment,
    );
  }

  @Get('rooms/:roomId/reviews')
  getReviews(
    @Param('roomId') roomId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.reviewService.getRoomReviews(roomId, page, limit);
  }

  @Delete('reviews/:id')
  @UseGuards(AuthGuard)
  deleteReview(
    @Param('id') id: string,
    @User() user: { sub: string; roles: string[] },
  ) {
    const isAdmin = user.roles?.includes('ADMIN');
    return this.reviewService.deleteReview(id, user.sub, isAdmin);
  }
}
