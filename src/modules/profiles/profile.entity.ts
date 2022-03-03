import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { IUserAttributes, IUserOuput, User } from '../users/user.entity';

export interface IProfileAttributes {
  id: number;
  about?: string;
  company?: string;
  job?: string;
  country?: string;
  address?: string;
  phone?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  userId?: number;
  user?: IUserOuput;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProfileInput extends Optional<IProfileAttributes, 'id'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProfileOutput extends Required<IProfileAttributes> {}

@Table
export class Profile
  extends Model<IProfileAttributes, IProfileInput>
  implements IProfileAttributes
{
  id: number;

  @ApiPropertyOptional({
    default:
      'Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.',
  })
  @Column({
    type: DataType.TEXT,
  })
  about: string;

  @ApiPropertyOptional({
    default: 'Lueilwitz, Wisoky and Leuschke',
  })
  @Column({
    type: DataType.STRING,
  })
  company: string;

  @ApiPropertyOptional({
    default: 'Web development',
  })
  @Column({
    type: DataType.STRING,
  })
  job: string;

  @ApiPropertyOptional({
    default: 'A108 Adam Street, New York, NY 535022',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiPropertyOptional({
    default: '(436) 486-3538 x29071',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiPropertyOptional({
    default: 'Cuba',
  })
  @Column({
    type: DataType.STRING,
  })
  country: string;

  @ApiPropertyOptional({
    default: 'linkedin.com',
  })
  @Column({
    type: DataType.STRING,
  })
  linkedin: string;

  @ApiPropertyOptional({
    default: 'facebook.com',
  })
  @Column({
    type: DataType.STRING,
  })
  facebook: string;

  @ApiPropertyOptional({
    default: 'twitter.com',
  })
  @Column({
    type: DataType.STRING,
  })
  twitter: string;

  @ApiPropertyOptional({
    default: 'instagram.com',
  })
  @Column({
    type: DataType.STRING,
  })
  instagram: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty()
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
