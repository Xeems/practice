import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { DataService } from 'src/data/data.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports:[HttpModule],
    providers:[AddressService, DataService, PrismaService]
})
export class AddressModule {}
