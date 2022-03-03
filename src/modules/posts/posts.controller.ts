import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
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
import { PostsService } from './posts.service';
import { Post as PostEntity, IPostOutput } from './post.entity';
import { ResponseDto } from 'src/utils/dto/Response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOkResponse({ type: [PostEntity] })
  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @ApiOkResponse({ type: PostEntity })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IPostOutput> {
    return await this.postService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: ResponseDto })
  @Post()
  async create(@Body() post: PostEntity, @Request() req): Promise<ResponseDto> {
    await this.postService.create(post, req.user.id);
    return {
      success: true,
      message: 'Successfully updated',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: PostEntity })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: PostEntity,
    @Request() req,
  ): Promise<IPostOutput> {
    return await this.postService.update(data, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<ResponseDto> {
    await this.postService.delete(id);
    return {
      success: true,
      message: 'Successfully deleted',
    };
  }
}
