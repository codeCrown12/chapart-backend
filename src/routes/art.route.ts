import { Router } from "express"
import ArtController from "../controllers/art.controller"
import { AppRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import authMiddleware from "../middlewares/auth.middleware"
import multer from "../utils/multer"
import AddArtWorkDto from "../dtos/art/addArtWork.dto"
import UpdateArtWorkDto from "../dtos/art/updateArtWork.dto"
import GetArtWorkDto from "../dtos/art/getArtWork.dto"

export default class ArtRoute implements AppRoute {

    public path: string = '/art'
    public router: Router = Router()
    private controller: ArtController = new ArtController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.get(
            '/get',
            dtoValidationMiddleware(GetArtWorkDto, "query"),
            this.controller.getArtWorks
        )

        this.router.get(
            '/get/:id',
            this.controller.getSingleArtWork
        )

        this.router.post(
            '/upload',
            authMiddleware,
            multer.array('image', 6),
            this.controller.uploadDocuments
        )

        this.router.post(
            '/add',
            authMiddleware,
            dtoValidationMiddleware(AddArtWorkDto, "body"),
            this.controller.addArtWork
        )

        this.router.put(
            '/update/:id',
            authMiddleware,
            dtoValidationMiddleware(UpdateArtWorkDto, "body"),
            this.controller.updateArtWork
        )

        this.router.delete(
            '/delete/:id',
            authMiddleware,
            this.controller.deleteArtWork
        )

    }

}