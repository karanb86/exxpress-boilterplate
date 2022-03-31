import express from 'express';
import cors from 'cors';
import { ENV_ENVIRONMENT } from './utils/secrets.util';
import { APP_ENV } from './utils/constants.util';
import _ from 'lodash';
import { apiRoutes } from './routes/api.routes';
import { instantiateServices } from './services/instantiate.service';

export class Application {
  private readonly APP: express.Application;
  private readonly PORT: number;
  private readonly DEV_ORIGINS = [
    'http://localhost:8080'
  ];

  constructor(port: number) {
    this.APP = express();
    this.PORT = port;
    this.setupCORS();
    instantiateServices();
    this.initRoutes();
  }

  start(): void {
    this.APP.listen(this.PORT, () => {
      console.log(`App Started on PORT: ${this.PORT}`);
    });

    this.APP.on('SIGINT', () => {
      this.deInit();
    });
  }

  private deInit(): void {
    console.log('DEINITing...');
  }

  private setupCORS(): void {
    const corsOptions = {
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
      ) => {
        // This will generate prod subdomain on APP_ENV.LOCAL but is harmless
        let envSubdomain = '';

        if (ENV_ENVIRONMENT === APP_ENV.DEVELOPMENT) {
          envSubdomain = 'dev.';
        }

        if (ENV_ENVIRONMENT === APP_ENV.STAGE) {
          envSubdomain = 'staging.';
        }

        const allOrigins = [
          // Disallowing dev origins on prod
          ...(ENV_ENVIRONMENT === APP_ENV.PRODUCTION ? [] : this.DEV_ORIGINS),
        ];

        if (!origin || _.includes(allOrigins, origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      exposedHeaders: ['Content-Disposition'],
    };
    this.APP.use(cors(corsOptions));
    this.APP.options('*');
  }

  private initRoutes(): void {
    this.APP.use(apiRoutes);
  }
}
