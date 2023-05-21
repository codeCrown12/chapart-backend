import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import UpdateProfileDto from "../dtos/user/updateProfile.dto"
import ArtworktDto from "../dtos/user/artWork.dto"
import { QueryFilter } from "../interfaces/filter.interface"
import GetArtWorkDto from "../dtos/art/getArtWork.dto"

export default class UserService {
    
    private dbService: PrismaClient

    constructor() {
        this.dbService = database.getClient()
    }

    public async getProfile (id: string) {
        const user = await this.dbService.user.findFirst({
            where: {
                id: id
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const { 
            email,
            username, 
            firstname, 
            lastname, 
            is_artist,
            email_verified, 
            date,
            bookmarks, 
            profile_image,
            bio,
            country
        } = user

        return { user: {
            email,
            username, 
            firstname, 
            lastname, 
            is_artist,
            email_verified, 
            date, 
            bookmarks, 
            profile_image,
            bio,
            country
        } }
    }


    public async updateProfile (id: string, updateProfileDto: UpdateProfileDto) {
        const user = await this.dbService.user.update({
            where: {
                id: id
            },
            data: updateProfileDto
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const { 
            email,
            username, 
            firstname, 
            lastname, 
            is_artist,
            email_verified, 
            date, 
            bookmarks, 
            profile_image,
            bio,
            country
        } = user
        return { 
            user: {
                email,
                username, 
                firstname, 
                lastname, 
                is_artist, 
                email_verified, 
                date,
                bookmarks, 
                profile_image,
                bio,
                country
            }
        }
    }

    public async addArtToBookmarks (id: string, artworkDto: ArtworktDto) {
        const art = await this.dbService.art.findFirst({
            where: {
                slug: artworkDto.id
            }
        })
        if(!art) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art not found")
        }
        const user = await this.dbService.user.findFirst({
            where: {
                id: id
            }
        })
        if(user?.bookmarks.includes(artworkDto.id)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art already added to bookmarks")
        }
        const updatedUser = await this.dbService.user.update({
            where: {
                id: id
            },
            data: {
                bookmarks: {
                    push: artworkDto.id
                }
            }
        })
        if(!updatedUser) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const { 
            email,
            username, 
            firstname, 
            lastname, 
            is_artist,
            email_verified, 
            date, 
            bookmarks, 
            profile_image,
            bio,
            country
        } = updatedUser
        return { 
            user: {
                email,
                username, 
                firstname, 
                lastname, 
                is_artist, 
                email_verified, 
                date,
                bookmarks, 
                profile_image,
                bio,
                country
            }
        }
    }

    public async removeArtFromBookmarks (id: string, artworkDto: ArtworktDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                id: id
            }
        })
        if(!user?.bookmarks.includes(artworkDto.id)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art not in bookmarks")
        }
        const currentBookmarks = user?.bookmarks
        currentBookmarks?.splice(currentBookmarks.indexOf(artworkDto.id), 1)
        const updatedUser = await this.dbService.user.update({
            where: {
                id: id
            },
            data: {
                bookmarks: currentBookmarks
            }
        })
        if(!updatedUser) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const { 
            email,
            username, 
            firstname, 
            lastname, 
            is_artist,
            email_verified, 
            date, 
            bookmarks, 
            profile_image,
            bio,
            country
        } = updatedUser
        return { 
            user: {
                email,
                username, 
                firstname, 
                lastname, 
                is_artist, 
                email_verified, 
                date,
                bookmarks, 
                profile_image,
                bio,
                country
            }
        }
    }

    public async getArtWorks (id: string, filterParams: GetArtWorkDto) {
        const limit = filterParams.limit ? parseInt(filterParams.limit) : 50
        let query: QueryFilter = {
            include: {
                author: true
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

    public async followUser() {

    }


    public async unfollowUser() {

    }
    

}