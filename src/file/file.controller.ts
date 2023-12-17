import { Controller, Get, Post, Req, Res, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileTypeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { UploadFileService } from './uploadFile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from './file.service';

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

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getFile(@Req() req: any, fileId: number, @Response({ passthrough: true }) res) {
    const workbook = await this.fileService.getFile(fileId)

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=example.xlsx'
    });

    await workbook.xlsx.write(res);
    res.end()
  }
}
