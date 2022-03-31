import dotenv from 'dotenv';
import { FILEPATH_ENV } from './constants.util';

dotenv.config({ path: FILEPATH_ENV });

export const ENV_ENVIRONMENT = process.env.NODE_ENV;


// @ts-ignore
export const ENV_APP_PORT_REST = +process.env.APP_PORT_REST;
