import { Controller, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileTypeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileUploadService: FileService) { }

  @Post("/exel")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadExelFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    ]
  })) file: Express.Multer.File) {
    return await this.fileUploadService.uploadExelFile(file)
  }
}
