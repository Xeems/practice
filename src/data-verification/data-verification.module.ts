import { Module } from '@nestjs/common';
import { DataVerificationService } from './data-verification.service';
import { DataService } from 'src/data/data.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers:[DataVerificationService, DataService, PrismaService],
    exports:[DataVerificationService]
})
export class DataVerificationModule {
  
}
