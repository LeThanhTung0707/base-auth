import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cars')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCars() {
    return this.appService.findAllCars();
  }

  @Get(':id')
  getCar(@Param('id') id: string) {
    return this.appService.findCarById(id);
  }

  @Post()
  createCar(@Body() data: any) {
    return this.appService.createCar(data);
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
