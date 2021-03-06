import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import * as AWS from 'aws-sdk';

@Injectable()
export class SharedStorageService {
  private BUCKET: string;
  private PUBLIC_ENDPOINT: string;
  public constructor(
    @InjectS3() private readonly s3: S3,
    private configService: ConfigService,
  ) {
    this.BUCKET = configService.get('storage.bucket') || 'biosimdev';
    this.PUBLIC_ENDPOINT =
      configService.get('storage.publicEndpoint') ||
      'files-dev.biosimulations.org/';
    s3.config.update({ region: 'us-east-1' });
  }

  public async getObject(id: string): Promise<AWS.S3.GetObjectOutput> {
    const call = this.s3.getObject({ Bucket: this.BUCKET, Key: id }).promise();

    const res = await call;

    if (res.$response.error) {
      console.log(res.$response.error.message);
      throw res.$response.error.originalError;
    } else {
      return res;
    }
  }

  public async putObject(
    id: string,
    data: Buffer,
    isPrivate = false,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const acl = isPrivate ? 'private' : 'public-read';
    const request: AWS.S3.PutObjectRequest = {
      Key: id,
      Body: data,
      Bucket: this.BUCKET,
      ACL: acl,
    };

    const public_url = this.PUBLIC_ENDPOINT + id;
    const call = this.s3.upload(request);
    const res = await call.promise();
    res.Location = public_url;
    return res;
  }
}
