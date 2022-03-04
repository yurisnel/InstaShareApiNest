import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Post as PostEntity, IPostInput, IPostOutput } from './post.entity';
import { User as userEntity } from '../users/user.entity';
import { POST_REPOSITORY } from 'src/config/constants';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof PostEntity,
  ) {}

  async create(post: IPostInput, userId): Promise<IPostOutput> {
    return await this.postRepository.create({ ...post, userId });  
  }

  async findAll(): Promise<IPostOutput[]> {
    return await this.postRepository.findAll({
      include: [{ model: userEntity, attributes: { exclude: ['password'] } }],
    });
  }

  async findOneById(id: number): Promise<IPostOutput> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: userEntity, attributes: { exclude: ['password'] } }],
    });    
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.postRepository.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException("This post doesn't exist");
    }
    return true;
  }

  async update(data: IPostInput, id: number): Promise<IPostOutput> {
    const $repo = this.postRepository;
    return new Promise(function (resolve, reject) {
      $repo
        .update(data, {
          returning: true,
          where: { id },
        })
        .then(function ([number, items]) {
          const item = $repo.findOne({ where: { id } });          
          resolve(item);         
        });
    });
  }

  async updateError(data: IPostInput, id: number): Promise<IPostOutput> {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );
    if (numberOfAffectedRows == 0) {
      throw new NotFoundException("This post doesn't exist");
    }
    return updatedPost;
  }
}
