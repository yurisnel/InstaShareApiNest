import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../gender';

export class UserDto {
  @ApiPropertyOptional({
    default: '1',
    type: Number,
  })
  readonly id?: number;

  @ApiProperty({
    default: 'Pedro Ramirez',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    default: 'test01@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    default: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    enum: Gender,
    enumName: 'Gender',
    default: 'male',
  })
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: string;

  /*@ApiPropertyOptional({
    type: ProfileDto,
  })
  readonly profile?: ProfileDto;*/
}
