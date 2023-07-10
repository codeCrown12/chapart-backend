import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import MediaService from "./media.service"
import AddArtWorkDto from "../dtos/art/addArtWork.dto"
import UpdateArtWorkDto from "../dtos/art/updateArtWork.dto"
import GetArtWorkDto from "../dtos/art/getArtWork.dto"
import { QueryFilter } from "../interfaces/filter.interface"
import AddCategoryDto from "../dtos/art/addCategory.dto"

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
                category_id: artWork.category_id,
                is_signed: artWork.is_signed
            }
        })
        return newArtWork
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
        return updatedArtWork
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
        return deletedArtWork
    }

    public async getArtWorks (filterParams: GetArtWorkDto) {
        const limit = filterParams.limit ? parseInt(filterParams.limit) : 50
        let query: QueryFilter = {
            include: {
                author: {
                    select: {
                        id: true,
                        slug: true,
                        firstname: true,
                        lastname: true,
                        username: true,
                        profile_image: true
                    }
                }
            },
            take: limit,
            orderBy: {
                id: 'desc',
            }
        }
        if(filterParams.cursor) {
            query = {
                ...query,
                skip: 1,
                cursor: {
                    id: filterParams.cursor,
                }
            }
        }
        if(filterParams.category) {
            query = {
                ...query,
                where: {
                    category_id: filterParams.category
                }
            }
        }
        if(filterParams.search) {
            query = {
                ...query,
                where: {
                    OR: [
                        {
                            title: {
                                contains: filterParams.search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            description: {
                                contains: filterParams.search,
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
            }
        }
        const results = await this.dbService.art.findMany(query)
        let cursor = results[limit - 1]?.id ?? null
        return { results, cursor, limit }
    }

    public async getUserArtWorks (id: string, filterParams: GetArtWorkDto) {
        const limit = filterParams.limit ? parseInt(filterParams.limit) : 50
        let query: QueryFilter = {
            include: {
                author: {
                    select: {
                        id: true,
                        slug: true,
                        firstname: true,
                        lastname: true,
                        username: true,
                        profile_image: true
                    }
                }
            },
            take: limit,
            orderBy: {
                id: 'desc',
            },
            where: {
                author_id: id
            }
        }
        if(filterParams.cursor) {
            query = {
                ...query,
                skip: 1,
                cursor: {
                    id: filterParams.cursor,
                }
            }
        }
        if(filterParams.category) {
            query = {
                ...query,
                where: {
                    category_id: filterParams.category
                }
            }
        }
        if(filterParams.search) {
            query = {
                ...query,
                where: {
                    OR: [
                        {
                            title: {
                                contains: filterParams.search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            description: {
                                contains: filterParams.search,
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
            }
        }
        const results = await this.dbService.art.findMany(query)
        let cursor = results[limit - 1]?.id ?? null
        return { results, cursor, limit }
    }

    public async getSingleArtWork (id: string) {
        const result = await this.dbService.art.findFirst({
            where: {
                slug: id
            },
            include: {
                author: {
                    select: {
                        slug: true,
                        firstname: true,
                        lastname: true
                    }
                }
            }
        })
        if(!result) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art not found")
        }
        return result
    }

    public async getCategories() {
        const results = await this.dbService.category.findMany()
        return results
    }

    public async addCategory(addCategoryDto: AddCategoryDto) {
        const category = await this.dbService.category.findFirst({
            where: {
                name: addCategoryDto.name
            }
        })
        if(category) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Category already exists")
        }
        const newCategory = await this.dbService.category.create({
            data: {
                name: addCategoryDto.name
            }
        })
        return newCategory
    }
    
}