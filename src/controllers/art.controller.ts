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

}