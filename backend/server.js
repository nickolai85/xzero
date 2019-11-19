require('dotenv').config();

const env = process.env;

require('laravel-echo-server').run({
    authHost: env.APP_URL,
    devMode: env.APP_DEBUG,
    database: "redis",
    databaseConfig: {
        redis: {
            host: 'redis',
            port: env.REDIS_PORT,
        }
    }
});