import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataService {
    constructor(private prisma: PrismaService){}

    async uploadAddressesToDb(){
        ///const data = await this.prisma.
    }

}
