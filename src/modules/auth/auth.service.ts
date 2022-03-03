import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ProfileService } from '../profiles/profile.service';
import { IUserInput, IUserOuput} from '../users/user.entity';
import { LoginInputDto } from './dto/loginInput.dto';
import { LoginOutputDto } from './dto/loginOutput.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(login: LoginInputDto): Promise<LoginOutputDto> {
    let user = await this.validateUser(login.email, login.password);
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    let avatar = user.avatarUrl;
    let token = await this.generateToken(user);
    //const profile = await this.profileService.findOneByUserId(user.id);    
    return { user, token };
  }

  public async create(user: IUserInput): Promise<LoginOutputDto> {
    const userExist = await this.userService.findOneByEmail(user.email);
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }

    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken(result);
    
    return { user: result, token};
  }

  async validateUser(username: string, pass: string): Promise<IUserOuput> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    return !match ? null : user;
  }

  private async generateToken(user: IUserOuput): Promise<string> {
    const payload = { email: user.email, id: user.id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
