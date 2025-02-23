import Banner from "../models/Banner";
import { Cloudinary } from "../utils/Cloudinary";

export class BannerController {

    static async addBanner(req, res, next) {
        const path = req.file.path;
        const filename = (req.file.filename).split('.').slice(0, -1).join('.');
        try {
            const resulted_path = await Cloudinary.uploadMedia(path, 'bannerImages', filename);
            let data: any = {
                banner: resulted_path
            };
            if(req.body.restaurant_id) {
                data = { ...data, restaurant_id: req.body.restaurant_id };
            }
            const banner = await new Banner(data).save();
            res.send(banner);
        } catch(e) {
            next(e);
        }
    }

    static async getBanners(req, res, next) {
        try {
            const banners = await Banner.find({status: true}); 
            res.send(banners);
        } catch(e) {
            next(e);
        }
    }

    // private static async uploadBanner(req) {
    //     // const file = req.files.bannerImages;
    //     const path = req.file.path;
    //     console.log(req.file);
    //     const filename = (req.file.filename).split('.').slice(0, -1).join('.');
    //     try {
    //         const result = await Cloudinary.uploadMedia(
    //             path, // 'src/uploads/bannerImages/1653487496537-6544790681_1.jpg', // file.tempFilePath,
    //             'bannerImages',
    //             filename // '1653487496537-6544790681_1'   
    //         );
    //         return result;
    //     } catch(e) {
    //         throw(e);
    //     }
    // }

    static async shiftBanners(req, res, next) {
        try {
            // get all banners path
            const banners = await Banner.find({}); 
            for(let i = 0; i < banners?.length; i++) {
                const banner = (banners[i].banner).split('/');
                const filename = (banner[banner.length - 1]).split('.').slice(0, -1).join('.');
                const result = await Cloudinary.uploadMedia(
                    banners[i].banner,
                    'bannerImages',
                    filename
                );
                const updated_banner = await Banner.findOneAndUpdate(
                    { 
                        _id: banners[i]._id
                    },
                    {
                        banner: result,
                        updated_at: new Date()
                    },
                    { new: true }
                );
                if(updated_banner) console.log(updated_banner);
                else throw('Banner doesn\'t exist');
            }
            res.send('Banners shifted successfully');
        } catch(e) {
            next(e);
        }
    }

}