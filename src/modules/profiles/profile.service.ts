import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User as userEntity } from '../users/user.entity';
import { PROFILE_REPOSITORY } from '../../config/constants';
import {
  IProfileInput,
  IProfileOutput,
  Profile as ProfileEntity,
} from './profile.entity';
import { ProfileUserDto } from './dto/profile.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: typeof ProfileEntity,
    private readonly userService: UsersService,
  ) {}

  async create(data: IProfileInput, userId: number): Promise<IProfileOutput> {
    return await this.profileRepository.create({ ...data, userId });
  }

  async findAll(): Promise<IProfileOutput[]> {
    return await this.profileRepository.findAll({
      include: [{ model: userEntity, attributes: { exclude: ['password'] } }],
    });
  }

  async findOneByUserId(userId: number): Promise<IProfileOutput> {
    const item = await this.profileRepository.findOne({
      where: { userId },
      include: [{ model: userEntity, attributes: { exclude: ['password'] } }],
    });
    if (!item) {
      throw new NotFoundException("This item doesn't exist");
    }
    return item;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.profileRepository.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException("This item doesn't exist");
    }
    return true;
  }

  async update(data: IProfileInput, userId: number): Promise<IProfileOutput> {
    const $repo = this.profileRepository;
    return new Promise(function (resolve, reject) {
      $repo
        .update(data, {
          returning: true,
          where: { userId },
        })
        .then(function ([number, items]) {
          const item = $repo.findOne({ where: { userId } });
          if (item) {
            resolve(item);
          } else {
            throw new NotFoundException("This item doesn't exist");
          }
        });
    });
  }

  async updateOrCreate(
    data: ProfileUserDto,
    userId: number,
  ): Promise<IProfileOutput> {
    const profile = await this.profileRepository.findOne({ where: { userId } });

    if (profile) {
      const user = (({ name, email, password, gender }) => ({
        name,
        email,
        password,
        gender,
      }))(data);

      this.userService.update(user, userId);
      return this.update(data, userId);
    } else {
      return this.create(data, userId);
    }
  }
}
