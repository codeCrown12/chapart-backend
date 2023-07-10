import { Router } from "express"
import UserController from "../controllers/user.controller"
import { AppRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import authMiddleware from "../middlewares/auth.middleware"
import UpdateProfileDto from "../dtos/user/updateProfile.dto"
import ArtworktDto from "../dtos/user/artWork.dto"
import GetArtWorkDto from "../dtos/art/getArtWork.dto"

export default class UserRoute implements AppRoute {
    
    public path: string = '/user'
    public router: Router = Router()
    private controller: UserController = new UserController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        
        this.router.get(
            '/get',
            authMiddleware,
            this.controller.getProfile
        )

        this.router.put(
            '/update',
            authMiddleware,
            dtoValidationMiddleware(UpdateProfileDto, "body"),
            this.controller.updateProfile
        )

        this.router.patch(
            '/add_art_to_bookmarks',
            authMiddleware,
            dtoValidationMiddleware(ArtworktDto, "body"),
            this.controller.addArtToBookmarks
        )

        this.router.patch(
            '/remove_art_from_bookmarks',
            authMiddleware,
            dtoValidationMiddleware(ArtworktDto, "body"),
            this.controller.removeArtFromBookmarks
        )

        this.router.get(
            '/my_art_works',
            authMiddleware,
            dtoValidationMiddleware(GetArtWorkDto, "query"),
            this.controller.getMyArtWorks
        )

    }

}