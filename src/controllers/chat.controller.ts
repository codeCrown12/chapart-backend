import { NextFunction, Request, Response } from "express"
import ChatService from "../services/chat.service"
import { StatusCodes } from "http-status-codes"

export default class ChatController {

    public chatService: ChatService = new ChatService()

    public createRoom = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.chatService.createRoom(request.user?.id as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public getRooms = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.chatService.getRooms(request.user?.id as string, request.query)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public getRoomMessages = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.chatService.getRoomMessages(request.params.id, request.query)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public sendMessage = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.chatService.sendMessage(request.user?.slug as string, request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

}