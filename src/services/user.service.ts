import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import UpdateProfileDto from "../dtos/user/updateProfile.dto"
import ArtworktDto from "../dtos/user/artwork.dto"

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
            bookmarks, 
            profile_image,
            bio,
            wallet_balance,
            state,
            city
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
            bookmarks, 
            profile_image,
            bio,
            wallet_balance,
            state,
            city
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
            bookmarks, 
            profile_image,
            bio,
            wallet_balance,
            state,
            city
        } = user
        return { 
            user: {
                email,
                username, 
                firstname, 
                lastname, 
                is_artist, 
                phone_number, 
                email_verified, 
                date,
                bookmarks, 
                profile_image,
                bio,
                wallet_balance,
                state,
                city
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
        const { bookmarks } = updatedUser
        return { bookmarks }
    }


    public async removeArtFromBookmarks (id: string, artworkDto: ArtworktDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                id: id
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const currentBookmarks = user.bookmarks
        currentBookmarks.splice(currentBookmarks.indexOf(artworkDto.id), 1)
        const updatedUser = await this.dbService.user.update({
            where: {
                id: id
            },
            data: {
                bookmarks: currentBookmarks
            }
        })
        const { bookmarks } = updatedUser
        return { bookmarks }
    }


    public async addArtToExhibit(id: string, artworkDto: ArtworktDto) {
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
        if(user?.exhibition.includes(artworkDto.id)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Art already added to exhibit")
        }
        const updatedUser = await this.dbService.user.update({
            where: {
                id: id
            },
            data: {
                exhibition: {
                    push: artworkDto.id
                }
            }
        })
        if(!updatedUser) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const { exhibition } = updatedUser
        return { exhibition }
    }


    public async removeArtFromExhibit(id: string, artworkDto: ArtworktDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                id: id
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "User not found")
        }
        const currentExhibit = user.exhibition
        currentExhibit.splice(currentExhibit.indexOf(artworkDto.id), 1)
        const updatedUser = await this.dbService.user.update({
            where: {
                id: id
            },
            data: {
                exhibition: currentExhibit
            }
        })
        const { bookmarks } = updatedUser
        return { bookmarks }
    }


    public async followUser() {

    }


    public async unfollowUser() {

    }
    

}