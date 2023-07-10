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
            slug,
            email,
            username, 
            firstname, 
            lastname,
            email_verified, 
            created_at,
            updated_at,
            bookmarks, 
            profile_image,
            bio,
            country
        } = user

        return {
            id,
            slug,
            email,
            username, 
            firstname, 
            lastname,
            email_verified, 
            created_at,
            updated_at, 
            bookmarks, 
            profile_image,
            bio,
            country 
        }
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
            slug,
            email,
            username, 
            firstname, 
            lastname,
            email_verified, 
            created_at,
            updated_at, 
            bookmarks, 
            profile_image,
            bio,
            country
        } = user
        return { 
            id,
            slug,
            email,
            username, 
            firstname, 
            lastname,
            email_verified, 
            created_at,
            updated_at,
            bookmarks, 
            profile_image,
            bio,
            country
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
            slug,
            email,
            username, 
            firstname, 
            lastname,
            email_verified, 
            created_at,
            updated_at, 
            bookmarks, 
            profile_image,
            bio,
            country
        } = updatedUser
        return { 
            id,
            slug,
            email,
            username, 
            firstname, 
            lastname, 
            email_verified, 
            created_at,
            updated_at,
            bookmarks, 
            profile_image,
            bio,
            country
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
            slug,
            email,
            username, 
            firstname, 
            lastname,
            email_verified, 
            created_at,
            updated_at, 
            bookmarks, 
            profile_image,
            bio,
            country
        } = updatedUser
        return { 
            id,
            slug,
            email,
            username, 
            firstname, 
            lastname, 
            email_verified, 
            created_at,
            updated_at,
            bookmarks, 
            profile_image,
            bio,
            country
        }
    }
    

    public async followUser() {

    }


    public async unfollowUser() {

    }
    

}