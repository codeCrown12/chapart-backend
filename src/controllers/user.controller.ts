import { NextFunction, Request, Response } from "express"
import UserService from "../services/user.service"
import { StatusCodes } from "http-status-codes"
import ArtService from "../services/art.service"

export default class UserController {

    public userService: UserService = new UserService()
    public artService: ArtService = new ArtService()

    public getProfile = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.userService.getProfile(request.user?.id as string)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public updateProfile = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.userService.updateProfile(request.user?.id as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public addArtToBookmarks = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.userService.addArtToBookmarks(request.user?.id as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public removeArtFromBookmarks = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.userService.removeArtFromBookmarks(request.user?.id as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public getMyArtWorks = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.getUserArtWorks(request.user?.id as string, request.query)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

}