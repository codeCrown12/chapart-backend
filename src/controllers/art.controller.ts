import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import ArtService from "../services/art.service"

export default class ArtController {

    public artService: ArtService = new ArtService()

    public uploadDocuments = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.uploadFiles(request.files as Express.Multer.File[])
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public addArtWork = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.addArtWork(request.user?.id as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public updateArtWork = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.updateArtWork(request.params.id as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public deleteArtWork = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.deleteArtWork(request.params.id as string)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public getArtWorks = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.getArtWorks(request.query)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public getSingleArtWork = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.artService.getSingleArtWork(request.params.id as string)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

}