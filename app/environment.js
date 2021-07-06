require("dotenv/config")

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASS: process.env.MONGODB_PASS,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PROJECT_NAME: process.env.PROJECT_NAME,
    MONGODB_PORT: process.env.MONGODB_PORT,
    API_PREFIX: process.env.API_PREFIX,
    SEED_DATA: process.env.SEED_DATA,
    PROVIDER_RPC_HECO: process.env.PROVIDER_RPC_HECO,
    PROVIDER_RPC_BSC: process.env.PROVIDER_RPC_BSC,
    EMAIL_RECEIVE: process.env.EMAIL_RECEIVE,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}

