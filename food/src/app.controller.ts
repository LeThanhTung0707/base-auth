import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('restaurants')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRestaurants() {
    return this.appService.findAllRestaurants();
  }

  @Get(':id')
  getRestaurant(@Param('id') id: string) {
    return this.appService.findRestaurantById(id);
  }

  @Post()
  createRestaurant(@Body() data: any) {
    return this.appService.createRestaurant(data);
  }

  @Get(':id/menu')
  getMenu(@Param('id') id: string) {
    return this.appService.findMenuItemsByRestaurant(id);
  }

  @Post('redis-test')
  testRedis(@Body() cacheData: { key: string; value: string }) {
    return this.appService.setCache(cacheData.key, cacheData.value);
  }

  @Get('redis-test/:key')
  getRedis(@Param('key') key: string) {
    return this.appService.getCache(key);
  }
}
