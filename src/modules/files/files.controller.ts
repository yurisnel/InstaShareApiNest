import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiFile } from './decorator/api-file-decorator';
import { ApiFiles } from './decorator/api-files.decorator';
import { ApiFileFields } from './decorator/api-file-fields.decorator';
import { ParseFile } from '../../pipes/parse.file.pipe';
import { ResponseDto } from 'src/utils/dto/Response.dto';

const localOptions: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const user: any = req.user;
      const dest = './uploads/' + user.id;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs');
      !fs.existsSync(dest) && fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const timeName = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[^0-9]/g, '');
      const fileName = timeName + '-' + file.originalname;
      return cb(null, fileName);
    },
  }),
};

@Controller('files')
@ApiTags('files')
export class FilesController {
  @ApiOperation({ summary: 'Upload File' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('upload')
  @ApiFile('file', true, localOptions)
  @ApiResponse({ status: 201, type: ResponseDto })
  async uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
    return {
      success: true,
      message: 'Successfully Upload File',
    };
  }

  @ApiOperation({ summary: 'Upload Files List' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('uploads')
  @ApiFiles('files', true, 10, localOptions)
  @ApiResponse({ status: 201, type: ResponseDto })
  async uploadFiles(
    @UploadedFiles(ParseFile) files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return {
      success: true,
      message: 'Successfully Upload File',
    };
  }

  @ApiOperation({ summary: 'Upload avatar and background' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('uploadFields')
  @ApiFileFields(
    [
      { name: 'avatar', maxCount: 1, required: true },
      { name: 'background', maxCount: 1 },
    ],
    localOptions,
  )
  @ApiResponse({ status: 201, type: ResponseDto })
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return {
      success: true,
      message: 'Successfully Upload File',
    };
  }
}
