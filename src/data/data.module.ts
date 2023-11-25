import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DataService, PrismaService],
  exports: [DataService]
})
export class DataModule {  }
 