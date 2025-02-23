import Category from "../models/Category";
import Item from "../models/Item";
import { Cloudinary } from "../utils/Cloudinary";

export class ItemController {

    static async addItem(req, res, next) {
        const itemData = req.body;
        const path = req.file.path;
        const filename = (req.file.filename).split('.').slice(0, -1).join('.');
        try {
            // create item
            const resulted_path = await Cloudinary.uploadMedia(path, 'itemImages', filename);
            let item_data: any = {
                name: itemData.name,
                status: itemData.status,
                price: parseInt(itemData.price),
                veg: itemData.veg,
                category_id: itemData.category_id,
                restaurant_id: itemData.restaurant_id,
                cover: resulted_path
            };
            if(itemData.description) item_data = {...item_data, description: itemData.description};
            const itemDoc = await new Item(item_data).save();
            res.send(itemDoc);
        } catch(e) {
            next(e);
        }
    }

    static async getMenu(req, res, next) {
        const restaurant = req.restaurant;
        try {
            const categories = await Category.find({ restaurant_id: restaurant._id }, { __v: 0 });
            const items = await Item.find(
                {
                    // status: true,
                    restaurant_id: restaurant._id
                }
            );
            res.json({
                restaurant,
                categories,
                items
            });
        } catch(e) {
            next(e);
        }
    }

    static async shiftMenuImages(req, res, next) {
        try {
            // get all restaurant menu image
            const items = await Item.find({}); 
            for(let i = 0; i < items?.length; i++) {
                const item = (items[i].cover).split('/');
                const filename = (item[item.length - 1]).split('.').slice(0, -1).join('.');
                const result = await Cloudinary.uploadMedia(
                    items[i].cover,
                    'itemImages',
                    filename
                );
                const updated_restaurant = await Item.findOneAndUpdate(
                    { 
                        _id: items[i]._id
                    },
                    {
                        cover: result,
                        updated_at: new Date()
                    },
                    { new: true }
                );
                if(updated_restaurant) console.log(updated_restaurant);
                else throw('Restaurant Menu doesn\'t exist');
            }
            res.send('Restaurant Menu Images shifted successfully');
        } catch(e) {
            next(e);
        }
    }

}