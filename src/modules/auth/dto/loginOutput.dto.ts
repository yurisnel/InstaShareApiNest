import { ApiProperty } from '@nestjs/swagger';
import { IUserOuput, User } from 'src/modules/users/user.entity';


export class LoginOutputDto {
  @ApiProperty({ type: () => User })
  readonly user: IUserOuput;
  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inlib2xtZXlAZ21haWwuY29tIiwiaWQiOjQsImlhdCI6MTY0MTU4NDgwNSwiZXhwIjoxNjQxNzU3NjA1fQ.s4PyEFgY7cPH08o8NXY4FC3f0VW6LY8uzZZD40jzMEA',
  }) 
  readonly token: string;

  //@ApiPropertyOptional({ type: () => ProfileDto })
  //readonly profile: IProfileOutput;
}

/*
const userLoginSchema = {
  type: 'object',
  properties: {
    user: { $ref: getSchemaPath(UserDto) },
    profile: { $ref: getSchemaPath(ProfileDto) },
    token: {
      type: 'string',
      example:
        '',
    },
  },
};

@ApiCreatedResponse({ schema: userLoginSchema })

*/
