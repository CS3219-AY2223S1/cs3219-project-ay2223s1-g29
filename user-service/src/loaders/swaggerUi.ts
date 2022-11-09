import * as express from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs';

export default async (app: express.Application) => {
  const options = {
    customSiteTitle: 'Users API',
  };
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs(), options));
};
