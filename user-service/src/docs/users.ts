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
    summary: 'Updates a user by id',
    description: 'Updates a user by id',
    tags,
    parameters: [
      {
        in: 'path',
        name: 'userId',
        type: 'string',
        required: true,
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Leanne Graham',
              },
              dob: {
                type: 'string',
                example: '11/11/1991',
              },
              address: {
                type: 'string',
                example: '711-721 Debs Place',
              },
              description: {
                type: 'string',
                example: 'I am a user',
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
