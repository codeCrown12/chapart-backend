import { Router } from "express"
import ArtController from "../controllers/art.controller"
import { AppRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import authMiddleware from "../middlewares/auth.middleware"
import multer from "../utils/multer"

export default class ArtRoute implements AppRoute {

    public path: string = '/art'
    public router: Router = Router()
    private controller: ArtController = new ArtController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.post(
            '/upload',
            authMiddleware,
            multer.array('image', 6),
            this.controller.uploadDocuments
        )

    }

}