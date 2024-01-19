export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME || 'opika-backend-api',
  },
});
