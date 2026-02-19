import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { Multer } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    // Validate file type (image only)
    if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
        throw new BadRequestException('Only image files are allowed');
    }

    try {
      const url = await this.s3Service.uploadFile(file);
      return { url };
    } catch (error) {
      throw new BadRequestException('File upload failed');
    }
  }
}
