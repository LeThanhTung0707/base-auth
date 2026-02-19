import { Injectable, Logger } from '@nestjs/common';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { Multer } from 'multer';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private readonly logger = new Logger(S3Service.name);

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME || 'rooms-bucket';
    
    const config = {
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
      },
      endpoint: process.env.AWS_S3_ENDPOINT || 'http://localstack:4566',
      forcePathStyle: true,
    };

    this.logger.log(`Initializing S3 Service with config: ${JSON.stringify({ ...config, credentials: '***' })}`);
    this.s3Client = new S3Client(config);
    
    this.ensureBucketExists();
  }

  async ensureBucketExists() {
    try {
      const { CreateBucketCommand, HeadBucketCommand } = await import('@aws-sdk/client-s3');
      try {
        await this.s3Client.send(new HeadBucketCommand({ Bucket: this.bucketName }));
      } catch (error) {
        this.logger.log(`Bucket ${this.bucketName} not found, creating...`);
        await this.s3Client.send(new CreateBucketCommand({ Bucket: this.bucketName }));
        this.logger.log(`Bucket ${this.bucketName} created.`);
      }
    } catch (err) {
      this.logger.error("Failed to ensure bucket exists", err);
    }
  }

  async uploadFile(file: Multer.File): Promise<string> {
    const key = `${uuidv4()}-${file.originalname}`;
    
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        },
      });

      await upload.done();
      // AWS_S3_ENDPOINT is internal (localstack:4566). 
      // PUBLIC_S3_ENDPOINT is what browsers can access (localhost:4566).
      const publicEndpoint = process.env.PUBLIC_S3_ENDPOINT || process.env.AWS_S3_ENDPOINT || 'http://localhost:4566';
      return `${publicEndpoint}/${this.bucketName}/${key}`;
    } catch (error) {
      this.logger.error("S3 Upload Failed", error);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      await this.s3Client.send(new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }));
      this.logger.log(`Deleted S3 object: ${key}`);
    } catch (error) {
      this.logger.error(`S3 Delete Failed for key: ${key}`, error);
      throw error;
    }
  }
}
