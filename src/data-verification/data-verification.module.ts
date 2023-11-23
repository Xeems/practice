import { Module } from '@nestjs/common';
import { DataVerificationService } from './data-verification.service';

@Module({
    providers:[DataVerificationService],
})
export class DataVerificationModule {
  
}
