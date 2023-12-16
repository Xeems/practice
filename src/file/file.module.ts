import { Module } from '@nestjs/common';
import {UploadFileService } from './uploadFile.service';
import {FileController } from './file.controller';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataService } from 'src/data/data.service';
import { DataVerificationService } from 'src/data-verification/data-verification.service';
import { FileService } from './file.service';


@Module({
  controllers: [FileController],
  providers: [UploadFileService, AddressService, PrismaService, DataService, DataVerificationService, FileService],
})
export class FileModule {}
