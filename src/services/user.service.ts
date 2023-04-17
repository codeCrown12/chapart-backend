import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import UpdateProfileDto from "../dtos/user/updateProfile.dto"
import BookmarkArtDto from "../dtos/user/bookmarkArt.dto"

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
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        } = user

        return { user: {
            email,
            username, 
            firstname, 
            lastname, 
            is_artist, 
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
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
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        } = user
        return { user: {
            email,
            username, 
            firstname, 
            lastname, 
            is_artist, 
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        } }
    }

    public async bookmarkArt (id: string, bookmarkArtDto: BookmarkArtDto) {
        const art = await this.dbService.art.findFirst({
            where: {
                slug: bookmarkArtDto.id
            }
        })
        if(!art) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art not found")
        }
        const user = await this.dbService.user.update({
            where: {
                id: id
            },
            data: {
                bookmarks: {
                    push: bookmarkArtDto.id
                }
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const { bookmarks } = user
        return { bookmarks }
    }

}