import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // Throw generic error
  throw new Error("Couldn't find .env file");
}

export default {
  // Application port.
  port: parseInt(process.env.PORT) || 8003,

  // DB connection options.
  database: {
    url: process.env.DB_URL,
    name: 'collab-service',
  },
};
