import { Controller, Get, Param, Post, Req, Res, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileTypeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { UploadFileService } from './uploadFile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from './file.service';
import { Readable } from 'stream';

@Controller('file')
export class FileController {
  constructor(private readonly fileUploadService: UploadFileService,
    private readonly fileService: FileService) { }

  @Post("/uploadExcel")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadExelFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    ]
  })) file: Express.Multer.File, @Req() req: any) {
    console.log("userId  ", req.user)
    return await this.fileUploadService.uploadExelFile(file, req.user.user_id)
  }

  @Get("/userFiles")
  @UseGuards(AuthGuard('jwt'))
  async getUserFiles(@Req() req: any) {
    return await this.fileService.getUserFiles(req.user.user_id)
  }

  @Get(':fileId')
  @UseGuards(AuthGuard('jwt'))
  async getFile(@Param('fileId') fileId: string, @Response({ passthrough: true }) res) {
    console.log(fileId)
    const workbook = await this.fileService.getFile(parseInt(fileId))
    const dataBuffer = await workbook.xlsx.writeBuffer()

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=example.xlsx',
      'Content-Length': dataBuffer.byteLength,
    });
    res.send(dataBuffer)
  }
}
