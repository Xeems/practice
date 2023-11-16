import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, FileUploadModule, AddressModule, DataModule],
  providers: [AddressService],
})
export class AppModule {}
