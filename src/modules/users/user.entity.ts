import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

export interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserInput extends Optional<IUserAttributes, 'id'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserOuput extends Optional<IUserAttributes, 'password'> {}

@Table
export class User
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
