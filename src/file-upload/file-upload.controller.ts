import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileTypeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadedFileDTO } from './dto/uploadedFile.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post("/exel")
  @UseInterceptors(FileInterceptor('file'))
  async uploadExelFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    ]
  })) file: Express.Multer.File): Promise<uploadedFileDTO> {
    const data = await this.fileUploadService.readExelFile(file)
    const result: uploadedFileDTO ={
      document: data[0],
      meter_readings: data[1],
      errors: data[2]
    }
    return result
  }
}
