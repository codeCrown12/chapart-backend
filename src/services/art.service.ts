import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import MediaService from "./media.service"
import AddArtWorkDto from "../dtos/art/addArtWork.dto"
import UpdateArtWorkDto from "../dtos/art/updateArtWork.dto"

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

    public async addArtWork (id: string, artWork: AddArtWorkDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                id: id
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const category = await this.dbService.category.findFirst({
            where: {
                slug: artWork.category_id
            }
        })
        if(!category) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Category not found")
        }
        const newArtWork = await this.dbService.art.create({
            data: {
                author_id: user.slug,
                title: artWork.title,
                description: artWork.description,
                images: artWork.images,
                specifications: artWork.specifications,
                category_id: artWork.category_id
            }
        })
        return { art: newArtWork }
    }

    public async updateArtWork (id: string, artWork: UpdateArtWorkDto) {
        const category = await this.dbService.category.findFirst({
            where: {
                slug: artWork.category_id
            }
        })
        if(!category) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Category not found")
        }
        const updatedArtWork = await this.dbService.art.update({
            where: {
                slug: id
            },
            data: artWork
        })
        return { art: updatedArtWork }
    }

    public async deleteArtWork (id: string) {
        const deletedArtWork = await this.dbService.art.delete({
            where: {
                slug: id
            }
        })
        if(!deletedArtWork) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art not found")
        }
        return { art: deletedArtWork }
    }
    
}