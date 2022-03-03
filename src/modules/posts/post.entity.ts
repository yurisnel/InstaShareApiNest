import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export interface IPostAttributes {
  id: number;
  title: string;
  body: string;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPostInput extends Optional<IPostAttributes, 'id'> {}
// interface IPostInput extends Optional<PostAttributes, 'id' | 'userId'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPostOutput extends Required<IPostAttributes> {}

@Table
export class Post
  extends Model<IPostAttributes, IPostInput>
  implements IPostAttributes
{
  id: number;

  @ApiProperty({
    default: 'Mi primer post',
  })
  @IsNotEmpty()
  @MinLength(4)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    default: 'Este es el contenido de mi primer post',
  })
  @IsNotEmpty()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  user: User;

  // timestamps!
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}
