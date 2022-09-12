import info from './info';
import servers from './servers';
import users from './users';

export default () => {
  return {
    openapi: '3.0.3',
    info: info(),
    servers: servers(),
    paths: {
      '/users/register': {
        post: users.register(),
      },
      '/users/login': {
        post: users.login(),
      },
      '/users': {
        patch: users.patch(),
        delete: users.del(),
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  };
};
