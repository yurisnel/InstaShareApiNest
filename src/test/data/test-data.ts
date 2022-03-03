import { Gender } from '../../modules/users/gender';
import { IPostInput } from 'src/modules/posts/post.entity';
import { IUserInput, User } from 'src/modules/users/user.entity';

export const userDto: IUserInput = {
  email: 'test01@gmail.com',
  name: 'Pedro Ramirez',
  password: '123456',
  gender: Gender.MALE,
  avatar: 'avatar.png'
};

export const postInput: IPostInput = {
  title: 'Title A1',
  body: 'Body text A1',
};
