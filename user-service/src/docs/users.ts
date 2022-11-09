const tags = ['Users'];

const login = () => {
  return {
    summary: 'Login with username and password',
    description: 'Login with username and password',
    tags,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'John',
              },
              password: {
                type: 'string',
                example: 'password1234',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns the user',
      },
    },
  };
};

const register = () => {
  return {
    summary: 'Registers a new user',
    description: 'Registers a new user',
    tags,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'John',
              },
              password: {
                type: 'string',
                example: 'password1234',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns the created user',
      },
    },
  };
};

const patch = () => {
  return {
    summary: 'Updates a user',
    description: 'Updates a user',
    tags,
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              password: {
                type: 'string',
                example: 'password1234',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns the updated user',
      },
    },
  };
};

const del = () => {
  return {
    summary: 'Deletes a user by username',
    description: 'Deletes a user by username',
    tags,
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: 'Returns the deleted user',
      },
    },
  };
};

const Users = {
  register,
  login,
  patch,
  del,
};

export { Users as default };
