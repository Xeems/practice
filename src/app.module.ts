import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, FileUploadModule, AddressModule, DataModule],
  controllers: [AppController],
  providers: [AppService, AddressService],
})
export class AppModule {}
