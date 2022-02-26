import { Gender } from '../../modules/users/gender';
import { UserDto } from '../../modules/users/dto/user.dto';
import { IPostInput } from 'src/modules/posts/post.entity';

export const userDto: UserDto = {
  email: 'test01@gmail.com',
  name: 'Pedro Ramirez',
  password: '123456',
  gender: Gender.MALE,
};

export const postInput: IPostInput = {
  title: 'Title A1',
  body: 'Body text A1',
};
