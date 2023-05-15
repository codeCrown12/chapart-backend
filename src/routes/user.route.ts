import { Router } from "express"
import UserController from "../controllers/user.controller"
import { AppRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import authMiddleware from "../middlewares/auth.middleware"
import UpdateProfileDto from "../dtos/user/updateProfile.dto"
import BookmarkArtDto from "../dtos/user/artwork.dto"

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

        this.router.patch(
            '/update',
            authMiddleware,
            dtoValidationMiddleware(UpdateProfileDto, "body"),
            this.controller.updateProfile
        )

        this.router.patch(
            '/add_art_to_bookmarks',
            authMiddleware,
            dtoValidationMiddleware(BookmarkArtDto, "body"),
            this.controller.addArtToBookmarks
        )

        this.router.patch(
            '/remove_art_from_bookmarks',
            authMiddleware,
            dtoValidationMiddleware(BookmarkArtDto, "body"),
            this.controller.removeArtFromBookmarks
        )

    }

}