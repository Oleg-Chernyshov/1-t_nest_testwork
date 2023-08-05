import { Injectable } from "@nestjs/common";
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {

  async uploadFile(dataBuffer: Buffer, fileName: string) {
    const s3 = new S3({
      accessKeyId: 'minio',
      secretAccessKey: 'minio123',
      endpoint: 'http://localhost:9002',
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });
    
    const uploadResult = await s3.upload({
        Bucket: 'test',
        Body: dataBuffer,
        Key: `${uuid()}-${fileName}`,
    }).promise();

    const fileStorageInDBUrl = uploadResult.Location

    return fileStorageInDBUrl;
}
}
