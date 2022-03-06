import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { Gender } from './gender';

export interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  gender: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserInput extends Optional<IUserAttributes, 'id'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserOuput extends Optional<IUserAttributes, 'password' | 'avatar'> {
  avatarUrl: string
}

@Table
export class User
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  id: number;

  @ApiProperty({
    default: 'Pedro Ramirez',
  })
  @IsNotEmpty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    default: 'test01@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    default: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  
  @ApiProperty({
    enum: Gender,
    enumName: 'Gender',
    default: 'male',
  })
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @ApiProperty({
    default: 'avatar.png',
  }) 
  @Column({
    type: DataType.STRING
  })
  avatar: string;
  
    
  @ApiProperty({
    default: 'http://localhost/avatar.png',
  }) 
  @Column({
    type: DataType.VIRTUAL(DataType.STRING, ['avatar']),
    get() {     
      if(this['avatar'])
        return process.env.IMAGE_SERVER + '/avatars/' + this['avatar'];
      else
        return "";
    }
  })
  avatarUrl: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
