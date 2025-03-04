import { Environment } from "./environment";
import { Utils } from '../utils/Utils';

Utils.dotenvConfigs();

export const DevEnvironment: Environment = {
    db_uri: process.env.DEV_DB_URI,
    jwt_secret_key: process.env.DEV_JWT_SECRET_KEY,
    jwt_refresh_secret_key: process.env.DEV_REFRESH_TOKEN_SECRET,
    // sendgrid: {
    //     api_key: process.env.DEV_SENDGRID_API_KEY,
    //     email_from: process.env.DEV_SENDGRID_SENDER_EMAIL
    // },
    gmail_auth: {
        user: process.env.DEV_GMAIL_USER,
        pass: process.env.DEV_GMAIL_PASS
    },
    redis: {
        username: process.env.LOCAL_REDIS_USERNAME,
        password: process.env.LOCAL_REDIS_PASSWORD,
        host: process.env.LOCAL_REDIS_HOST,
        port: parseInt(process.env.LOCAL_REDIS_PORT)
    },
    // razorpay: {
    //     key_id: process.env.DEV_RAZORPAY_KEY_ID,
    //     key_secret: process.env.DEV_RAZORPAY_KEY_SECRET
    // },
    cloudinary: {
        cloud_name: process.env.DEV_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.DEV_CLOUDINARY_API_KEY,
        api_secret: process.env.DEV_CLOUDINARY_API_SECRET
    },
    stripe: {
        publishable_key: process.env.DEV_STRIPE_PUBLISHABLE_KEY,
        secret_key: process.env.DEV_STRIPE_SECRET_KEY
    }
};