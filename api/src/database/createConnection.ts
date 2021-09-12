import { createConnection, Connection } from 'typeorm';

// import * as entities from '../entities';

// import Comment from '../entities/Comment';
// import Issue from '../entities/Issue';
// import Project from '../entities/Project';
// import User from '../entities/User';

const createDatabaseConnection = (): Promise<Connection> =>
  {
    const test = {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: Object.values(entities),
      // entities: [Comment, Issue, Project, User],
      // entities: [__dirname + '../entities/*.{ts,js}'],
      entities: [__dirname + '../entities/*.js'],
      synchronize: true,
    }
    console.log(test.entities);
    return createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: Object.values(entities),
      // entities: [Comment, Issue, Project, User],
      // entities: [__dirname + '../entities/*.{ts,js}'],
      entities: [__dirname + '../entities/*.js'],
      synchronize: true,
    });
  }

export default createDatabaseConnection;
