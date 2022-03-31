import dotenv from 'dotenv';
import { FILEPATH_ENV } from './constants.util';

dotenv.config({ path: FILEPATH_ENV });

export const ENV_ENVIRONMENT = process.env.NODE_ENV;


// @ts-ignore
export const ENV_APP_PORT_REST = +process.env.APP_PORT_REST;

export const ENV_MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
export const ENV_MYSQL_USER = process.env.MYSQL_USER;
export const ENV_MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const ENV_MYSQL_DB = process.env.MYSQL_DB;
