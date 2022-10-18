import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // Throw generic error
  throw new Error("Couldn't find .env file");
}

export default {
  // Application port.
  port: parseInt(process.env.PORT) || 65080,
  wsPort: parseInt(process.env.WS_PORT) || 3002,

  // Questions service url.
  questionsServiceUrl:
    process.env.QUESTIONS_SERVICE_URL ||
    'https://cs3219-question-service-dot-cs3219-363515.as.r.appspot.com/api/questions',

  // DB connection options.
  database: {
    url: process.env.DB_URL,
    name: 'collab-service',
  },
};
