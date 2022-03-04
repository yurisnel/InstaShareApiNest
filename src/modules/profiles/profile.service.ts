import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User, User as userEntity } from '../users/user.entity';
import { PROFILE_REPOSITORY, SEQUELIZE, USER_REPOSITORY } from '../../config/constants';
import {
  IProfileInput,
  IProfileOutput,
  Profile
} from './profile.entity';
import { Sequelize, Transaction } from 'sequelize'

@Injectable()
export class ProfileService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(PROFILE_REPOSITORY) private readonly profileRepository: typeof Profile,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
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
    return await this.profileRepository.findOne({
      where: { userId },
      include: [{ model: userEntity, attributes: { exclude: ['password'] } }],
    });  
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.profileRepository.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException("This profile doesn't exist");
    }
    return true;
  }

  
  async update(data: IProfileInput, userId: number): Promise<any> {

    const t = await this.sequelize.transaction();
    try {
      await this.profileRepository
        .update(data, {
          returning: true,
          transaction: t,
          where: { userId },
        });

      let id = userId;
      await this.userRepository.update(data.user, {
        returning: true,
        transaction: t,
        where: { id },
      })
      const user = await this.findOneByUserId(userId);
      await t.commit();
      return user;

    } catch (error) {
      await t.rollback();
    }
    
    return false;
  }    
   

  async updateOrCreate(
    data: IProfileInput,
    userId: number,
  ): Promise<IProfileOutput> {
    const profile = await this.profileRepository.findOne({ where: { userId } });

    if (profile) { 
      return this.update(data, userId);
    } else {
      return this.create(data, userId);
    }
  }
}
