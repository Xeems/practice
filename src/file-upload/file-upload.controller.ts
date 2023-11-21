import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileTypeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post("/exel")
  @UseInterceptors(FileInterceptor('file'))
  async uploadExelFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    ]
  })) file: Express.Multer.File) {
    return await this.fileUploadService.readExelFile(file)
  }
}
