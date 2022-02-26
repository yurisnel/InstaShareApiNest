import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { User } from '../users/user.entity';

export interface IProfileAttributes {
  id: number;
  about?: string;
  company?: string;
  job?: string;
  address?: string;
  phone?: string;
  userId?: number;
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

  @Column({
    type: DataType.TEXT,
  })
  about: string;

  @Column({
    type: DataType.STRING,
  })
  company: string;

  @Column({
    type: DataType.STRING,
  })
  job: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

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
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
