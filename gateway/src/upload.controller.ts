import { Controller, Post, Delete, Body, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(@UploadedFiles() files: Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    
    for (const file of files) {
      if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
        throw new BadRequestException('Only image files are allowed');
      }
    }

    try {
      const urls = await this.s3Service.uploadFiles(files);
      return { urls };
    } catch (error) {
      throw new BadRequestException('Batch file upload failed');
    }
  }

  @Delete('image')
  async deleteImage(@Body('url') url: string) {
    if (!url) {
      throw new BadRequestException('No URL provided');
    }

    try {
      // Extract key from URL: http://localstack:4566/rooms-bucket/uuid-filename.jpg
      const urlObj = new URL(url);
      // pathname = /rooms-bucket/uuid-filename.jpg → key = uuid-filename.jpg
      const key = urlObj.pathname.split('/').slice(2).join('/');
      if (!key) {
        throw new BadRequestException('Could not extract key from URL');
      }

      await this.s3Service.deleteFile(key);
      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('File deletion failed');
    }
  }
}
