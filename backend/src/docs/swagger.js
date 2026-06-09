module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Request Prioritization Queue System API',
    version: '1.0.0',
    description: 'API documentation for the distributed request prioritization queue platform.',
  },
  servers: [{ url: '/api' }],
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login',
        responses: {
          200: { description: 'Authenticated' },
        },
      },
    },
    '/requests': {
      get: { summary: 'List requests' },
      post: { summary: 'Create request' },
    },
    '/analytics': {
      get: { summary: 'Get analytics summary' },
    },
    '/ai/health': {
      get: { summary: 'AI service health' },
    },
    '/ai/predict': {
      post: { summary: 'Predict request priority' },
    },
  },
};
