import dotenv from 'dotenv'
const myEnv = dotenv.config();

export const ADMIN_EMAIL=process.env.EMAIL
export const APP_PASSWORD=process.env.APP_PASSWORD

