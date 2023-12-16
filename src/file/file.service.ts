import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';

@Injectable()
export class FileService {
    constructor (private readonly dataService: DataService){}

    async getUserFiles(userId: number){
        const result = await this.dataService.getUserFiles(userId)
        return result
    }

}