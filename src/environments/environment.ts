import { DevEnvironment } from './environment.dev';
import { ProdEnvironment } from './environment.prod';

export interface Environment {
    db_uri: string,
    jwt_secret_key: string,
    jwt_refresh_secret_key: string,
    sendgrid?: {
        api_key: string,
        email_from: string,
    },
    gmail_auth?: {
        user: string,
        pass: string,
    },
    redis?: {
        username?: string,
        password?: string,
        host: string,
        port: number
    },
    // razorpay?: {
    //     key_id: string,
    //     key_secret: string
    // },
    cloudinary?: {
        cloud_name?: string,
        api_key: string,
        api_secret: string
    },
    stripe?: {
        publishable_key?: string,
        secret_key: string
    }
};

export function getEnvironmentVariables() {
    if(process.env.NODE_ENV === 'production') {
        return ProdEnvironment;
    }
    return DevEnvironment;
}