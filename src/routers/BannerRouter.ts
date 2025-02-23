import { Utils } from './../utils/Utils';
import { BannerValidators } from './../validators/BannerValidators';
import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { BannerController } from '../controllers/BannerController';

class BannerRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/banners', GlobalMiddleWare.auth, BannerController.getBanners);
        // this.router.get('/shift_banners', BannerController.shiftBanners);
    }

    postRoutes() {
        // this.router.post('/uploadBanner', new Utils().multer.single('bannerImages'), BannerValidators.addBanner(), GlobalMiddleWare.checkError, BannerController.uploadBanner);
        this.router.post('/create', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, new Utils().multer.single('bannerImages'), BannerValidators.addBanner(), GlobalMiddleWare.checkError, BannerController.addBanner);
    }

    patchRoutes() {
    }

    putRoutes() {}

    deleteRoutes() {}

}

export default new BannerRouter().router;