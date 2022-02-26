import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginOutputDto } from './dto/loginOutput.dto';
import { LoginInputDto } from './dto/loginInput.dto';
import { IUserInput } from '../users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: LoginOutputDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() login: LoginInputDto) {
    return await this.authService.login(login);
  }

  @ApiCreatedResponse({ type: LoginOutputDto })
  @ApiResponse({ status: 403, description: 'Invalid params' })
  @Post('signup')
  async signUp(@Body() user: IUserInput) {
    return await this.authService.create(user);
  }
}
