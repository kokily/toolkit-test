import 'dotenv/config';
import https from 'https';
import http from 'http';
import fs from 'fs';
import app from './app';
import { ConnectionOptions, createConnection } from 'typeorm';
import entities from './entities';

const ConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  logging: false,
  host: process.env.DB_URL,
  port: 5432,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities,
};

const _bootStrap = async () => {
  try {
    await createConnection(ConnectionOptions);

    const configurations = {
      production: { ssl: true, port: 443, hostname: 'paysys.kr' },
      development: { ssl: false, port: 4000, hostname: 'localhost' },
    };

    const environment = process.env.NODE_ENV || 'production';
    const config = configurations[environment];

    let server;

    if (config.ssl) {
      server = https.createServer(
        {
          key: fs.readFileSync(`${process.env.SSL_KEY}`),
          cert: fs.readFileSync(`${process.env.SSL_CERT}`),
        },
        app.callback()
      );
    } else {
      server = http.createServer(app.callback());
    }

    server.listen(config.port, () => {
      console.log(
        `> Paysys Shop server on http${config.ssl ? 's' : ''}://${
          config.hostname
        }:${config.port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
};

_bootStrap();
