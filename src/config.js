export default {
  API_PATH: {
    development: 'http://localhost:3002',
    production: 'https://smart-docs1.herokuapp.com',
  }[process.env.NODE_ENV || 'development'],
};
