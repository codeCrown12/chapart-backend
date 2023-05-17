import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import MediaService from "./media.service"

export default class ArtService {

    private dbService: PrismaClient
    private mediaService: MediaService

    constructor() {
        this.dbService = database.getClient()
        this.mediaService = new MediaService()
    }

    public async uploadFiles(files: Express.Multer.File[]) {
        if(!files) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "image is required.")
        }
        const uploads = await Promise.all(files.map(file => this.mediaService.uploadFile(file)))
        const images = uploads.map(upload => upload.secure_url)
        return { images }
    }

    public async addArtWork () {
        
    }


    public async updateArtWork () {

    }


    public async deleteArtWork () {

    }
    

}