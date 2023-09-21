import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const dbSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: Number(process.env.MYSQLDB_PORT),
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  entities: [User],
  logging: true,
  synchronize: true,
});
