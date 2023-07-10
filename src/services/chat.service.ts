import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import CreateRoomDto from "../dtos/chat/createRoom.dto"
import SendMessageDto from "../dtos/chat/sendMessage.dto"
import GetRoomsDto from "../dtos/chat/getRooms.dto"
import { QueryFilter } from "../interfaces/filter.interface"
import GetMessagesDto from "../dtos/chat/getMessages.dto"

export default class ChatService {

    private dbService: PrismaClient

    constructor() {
        this.dbService = database.getClient()
    }

    public async createRoom(id: string, createRoomDto: CreateRoomDto) {
        createRoomDto.users.push(id)
        const room = await this.dbService.room.findFirst({
            where: {
                user_ids: {
                    equals: createRoomDto.users
                }
            }
        })
        if(room) {
            return room
        }
        else {
            const newRoom = await this.dbService.room.create({
                data: {
                    user_ids: createRoomDto.users
                }
            })
            await this.dbService.user.update({
                where: {
                    id: id
                },
                data: {
                    room_ids: {
                        push: newRoom.id
                    }
                }
            })
            return newRoom
        }
    }

    public async getRooms(id: string, filterParams: GetRoomsDto) {
        const limit = filterParams.limit ? parseInt(filterParams.limit) : 50
        let query: QueryFilter = {
            include: {
                users: {
                    select: {
                        id: true,
                        slug: true,
                        firstname: true,
                        lastname: true,
                        username: true,
                        profile_image: true
                    }
                },
                messages: {
                    orderBy: {
                        created_at: 'desc'
                    },
                    take: 1
                }
            },
            take: limit,
            orderBy: {
                updated_at: 'desc',
            },
            where: {
                user_ids: {
                    has: id
                }
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
        const results = await this.dbService.room.findMany(query)
        let cursor = results[limit - 1]?.id ?? null
        return { results, cursor, limit }
    }

    public async getRoomMessages(room_id: string, filterParams: GetMessagesDto) {
        const room = await this.dbService.room.findFirst({
            where: {
                slug: room_id
            },
            select: {
                id: true,
                slug: true,
                users: {
                    select: {
                        id: true,
                        slug: true,
                        firstname: true,
                        lastname: true,
                        username: true,
                        profile_image: true
                    }
                }
            }
        })
        const limit = filterParams.limit ? parseInt(filterParams.limit) : 50
        let query: QueryFilter = {
            include: {
                sender: {
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
                updated_at: 'asc',
            },
            where: {
                room_id: room_id
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
        if(filterParams.search) {
            query = {
                ...query,
                where: {
                    message: {
                        contains: filterParams.search,
                        mode: 'insensitive'
                    }
                }
            }
        }
        const results = await this.dbService.message.findMany(query)
        let cursor = results[limit - 1]?.id ?? null
        return { room, results, cursor, limit }
    }

    public async sendMessage(slug: string, sendMessageDto: SendMessageDto) {
        const message = await this.dbService.message.create({
            data: {
                sender_id: slug,
                message: sendMessageDto.message,
                room_id: sendMessageDto.room_id
            }
        })
        return message
    }

}