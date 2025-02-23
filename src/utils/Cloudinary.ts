import { v2 as cloudinary } from 'cloudinary';
import { getEnvironmentVariables } from '../environments/environment';
import * as fs from 'fs';

export class Cloudinary {

    static async uploadMedia(path: string, dest_path: string, filename?: string, isRemove?: boolean) {
        try {
            cloudinary.config({ 
                cloud_name: getEnvironmentVariables().cloudinary.cloud_name, 
                api_key: getEnvironmentVariables().cloudinary.api_key, 
                api_secret: getEnvironmentVariables().cloudinary.api_secret,
                secure: true
            });
            let result = await cloudinary.uploader.upload(
                path,
                { 
                    public_id: filename || Date.now() + '-' + Math.round(Math.random() * 1E9),
                    resource_type: "auto",
                    folder: dest_path 
                }
            );

            if(isRemove) {
                // Remove file from local uploads folder 
                fs.unlinkSync(path);
            }

            console.log(result);
            return result.secure_url;
        } catch(e) {
            throw(e);
        }
    }

}