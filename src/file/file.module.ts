import { Module } from '@nestjs/common';
import {FileService } from './file.service';
import {FileController } from './file.controller';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataService } from 'src/data/data.service';
import { DataVerificationService } from 'src/data-verification/data-verification.service';

@Module({
  controllers: [FileController],
  providers: [FileService, AddressService, PrismaService, DataService, DataVerificationService],
})
export class FileModule {}
