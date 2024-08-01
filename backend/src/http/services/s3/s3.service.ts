import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { HandleError } from 'src/shared/errors/handleError';

@Injectable()
export class S3Service {
  private readonly _s3Client = new S3Client({
    region: process.env.AWS_REGION,
  });

  async uploadFile(filename: string, file: Buffer) {
    try {
        const result = await this._s3Client.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET,
              Key: filename,
              Body: file,
              ACL: 'public-read'
            }),
          );
          if (result.$metadata.httpStatusCode === 200) {
            return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
          }
    }
    catch (error) {
        throw new HandleError(error);
    }
  }
}
