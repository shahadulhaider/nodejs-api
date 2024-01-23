export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME || 'opika-backend-api',
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 300000, //miliseconds
  },
});
