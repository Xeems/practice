import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';
import { DataModule } from './data/data.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { DataVerificationService } from './data-verification/data-verification.service';
import { DataVerificationModule } from './data-verification/data-verification.module';


@Module({
  imports: [AuthModule, UsersModule, PrismaModule, FileUploadModule, AddressModule, DataModule, DataVerificationModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),

    DataVerificationModule,],
  providers: [AddressService, DataVerificationService],
})
export class AppModule { }
