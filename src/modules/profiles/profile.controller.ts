import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { IProfileOutput, Profile } from './profile.entity';
import { ResponseDto } from 'src/utils/dto/Response.dto';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: Profile })
  @Get()
  async findOne(@Request() req): Promise<IProfileOutput> {
    return await this.profileService.findOneByUserId(req.user.id);   
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: ResponseDto })
  @Put()
  async update(
    @Body() data: Profile,
    @Request() req,
  ): Promise<ResponseDto> {
    await this.profileService.updateOrCreate(data, req.user.id);
    return {
      success: true,
      message: 'Successfully updated',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete()
  async remove(@Request() req): Promise<ResponseDto> {
    await this.profileService.delete(req.user.id);
    return {
      success: true,
      message: 'Successfully deleted',
    };
  }
}
