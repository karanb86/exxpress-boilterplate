import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { QueryOptions } from 'sequelize';

import {
  ENV_MYSQL_DB,
  ENV_MYSQL_HOSTNAME,
  ENV_MYSQL_PASSWORD,
  ENV_MYSQL_USER,
} from '../utils/secrets.util';

class DBService {
  private _sequelize: Sequelize;

  constructor() {
    this._sequelize = new Sequelize({
      dialect: 'mysql',
      host: ENV_MYSQL_HOSTNAME,
      database: ENV_MYSQL_DB,
      username: ENV_MYSQL_USER,
      password: ENV_MYSQL_PASSWORD,
      logging: false,
      dialectOptions: {
        multipleStatements: true,
      },
    });

    // TODO: replace __dirname with appRotPath
    const modelPath = path.join(__dirname, '..', 'models', '**/*.model.*');

    this._sequelize.addModels([modelPath], (filename: string, member: string) => {
      const modelName = filename
        .substring(0, filename.indexOf('.model'))
        .replace(/-/g, '');
      return modelName === member.toLowerCase();
    });
  }

  static getInstance(): DBService {
    return new DBService();
  }

  getModel(name: string) {
    return this._sequelize.models[name];
  }

  async rawQuery(
    sql: string | { query: string; values: any[] },
    options?: QueryOptions
  ): Promise<any> {
    // console.log(sql);
    return this._sequelize.query(sql, options);
  }
}

export const dbService = DBService.getInstance();
