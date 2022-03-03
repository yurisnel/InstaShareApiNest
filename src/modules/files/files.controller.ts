import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiFile } from './decorator/api-file-decorator';
import { ApiFiles } from './decorator/api-files.decorator';
import { ApiFileFields } from './decorator/api-file-fields.decorator';
import { ParseFile } from '../../pipes/parse.file.pipe';
import { ResponseDto } from 'src/utils/dto/Response.dto';
import { optionsAvatar, optionsFiles } from './options.multer';
import { UsersService } from '../users/users.service';
import { USER_REPOSITORY } from 'src/config/constants';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Upload File' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('upload')
  @ApiFile('file', true, optionsFiles)
  @ApiResponse({ status: 201, type: ResponseDto })
  async uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
    return {
      success: true,
      message: 'Successfully Upload File',
      data: file
    };
  }

  @ApiOperation({ summary: 'Upload Files List' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('uploads')
  @ApiFiles('files', true, 10, optionsFiles)
  @ApiResponse({ status: 201, type: ResponseDto })
  async uploadFiles( @UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
    return {
      success: true,
      message: 'Successfully Upload File',
      data: files
    };
  }

  @ApiOperation({ summary: 'Upload avatar and background' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('avatar')
  @ApiFileFields(
    [
      { name: 'file', maxCount: 1, required: true },
      { name: 'background', maxCount: 1 },
    ],
    optionsAvatar,
  )
  @ApiResponse({ status: 201, type: ResponseDto })
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[], @Request() req) {
    
    let file = files['file'][0];    
    let user = this.userService.update({avatar: file['filename']}, req.user.id);
 
    return {
      success: true,
      message: 'Successfully Upload File',
      data: {
        name: file.fileName,
        url : (await user).avatarUrl
      }
    };
  }
}
