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
import { IPostInput, IPostOutput } from './post.entity';
import { PostDto } from './dto/post.dto';
import { ResponseDto } from 'src/utils/dto/Response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOkResponse({ type: [PostDto] })
  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @ApiOkResponse({ type: PostDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IPostOutput> {
    return await this.postService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: PostDto })
  @Post()
  async create(@Body() post: IPostInput, @Request() req): Promise<IPostOutput> {
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: PostDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: IPostInput,
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
