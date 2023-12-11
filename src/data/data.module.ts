import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DataService, PrismaService],
  exports: [DataService]
})
export class DataModule {  }
 