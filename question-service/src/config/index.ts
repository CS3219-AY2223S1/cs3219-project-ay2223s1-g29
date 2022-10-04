import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // Throw generic error
  throw new Error("Couldn't find .env file");
}

export default {
  // Application port.
  port: parseInt(process.env.PORT) || 7001,

  database: {
    url: "mongodb://localhost",
},
};