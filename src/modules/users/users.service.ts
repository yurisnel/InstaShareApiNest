import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { IUserInput, IUserOuput, User } from './user.entity';
import { USER_REPOSITORY } from '../../config/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(data: IUserInput): Promise<IUserOuput> {
    return await this.userRepository.create(data);
  }

  async findOneByEmail(email: string): Promise<IUserOuput> {
    const item = await this.userRepository.findOne({
      where: { email },
    });
    if (!item) {
      throw new NotFoundException("This user doesn't exist");
    }
    return item;
  }

  async findOneById(id: number): Promise<IUserOuput> {
    const item = await this.userRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException("This user doesn't exist");
    }
    return item;
  }

  async findAll(): Promise<IUserOuput[]> {
    return await this.userRepository.findAll({
      //include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.userRepository.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException("This user doesn't exist");
    }
    return true;
  }

  async update(data: Partial<IUserInput>, id: number): Promise<IUserOuput> {
    const $repo = this.userRepository;
    return new Promise(function (resolve, reject) {
      $repo
        .update(data, {
          returning: true,
          where: { id },
        })
        .then(function ([number, items]) {
          let item = $repo.findOne({ where: { id } });          
          resolve(item);     
        });
    });
  }

  async updateError(data: IUserInput, id: number): Promise<IUserOuput> {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.userRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );
    if (numberOfAffectedRows == 0) {
      throw new NotFoundException("This user doesn't exist");
    }
    return updatedPost;
  }
}
