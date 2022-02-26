import { Dialect } from 'sequelize/types';
import * as dotenv from 'dotenv';
let conf = {};
if (process.env.NODE_ENV && process.env.NODE_ENV == 'test') {
  conf = { path: '.env.test' };
}
dotenv.config(conf);

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  database: {
    dialect: process.env.DATABASE_DIALECT as Dialect,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
});
