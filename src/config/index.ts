
export const APP_PORT = Number(process.env.APP_PORT) || 3000;

export const DB = {
    PORT: Number(process.env.DB_PORT) || 8191,
    HOST: process.env.DB_HOST || 'localhost',
    NAME: process.env.DB_NAME || 'admin',
    USERNAME: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASS || '12345'
}

export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';