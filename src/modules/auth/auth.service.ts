import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ProfileService } from '../profiles/profile.service';
import { IUserInput, IUserOuput } from '../users/user.entity';
import { LoginInputDto } from './dto/loginInput.dto';
import { LoginOutputDto } from './dto/loginOutput.dto';
import { SEQUELIZE } from 'src/config/constants';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    private readonly userService: UsersService,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(login: LoginInputDto): Promise<LoginOutputDto> {
    let user = await this.validateUser(login.email, login.password);
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    let token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user: IUserInput): Promise<LoginOutputDto> {

    const userExist = await this.userService.findOneByEmail(user.email);
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }

    const t = await this.sequelize.transaction();
    try {
      const pass = await this.hashPassword(user.password);
      const newUser = await this.userService.create({ ...user, password: pass });

      const newProfile = await this.profileService.create({ about: ' ' }, newUser.id);

      const { password, ...result } = newUser['dataValues'];
      const token = await this.generateToken(result);

      await t.commit();    
      return { user: result, token };
   
    } catch (error) {
      await t.rollback();
      throw new ForbiddenException('Operation fail');
    }
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
