import { Router } from "express"
import RoomController from "../controllers/chat.controller"
import { AppRoute } from "../interfaces/route.interface"
import authMiddleware from "../middlewares/auth.middleware"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import CreateRoomDto from "../dtos/chat/createRoom.dto"
import GetRoomsDto from "../dtos/chat/getRooms.dto"
import SendMessageDto from "../dtos/chat/sendMessage.dto"
import GetMessagesDto from "../dtos/chat/getMessages.dto"

export default class ChatRoute implements AppRoute {
    
    public path: string = '/chat'
    public router: Router = Router()
    private controller: RoomController = new RoomController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){

        this.router.post(
            '/room/create',
            authMiddleware,
            dtoValidationMiddleware(CreateRoomDto, "body"),
            this.controller.createRoom
        )

        this.router.get(
            '/room/get',
            authMiddleware,
            dtoValidationMiddleware(GetRoomsDto, "query"),
            this.controller.getRooms
        )

        this.router.get(
            '/message/room/:id',
            authMiddleware,
            dtoValidationMiddleware(GetMessagesDto, "query"),
            this.controller.getRoomMessages
        )

        this.router.post(
            '/message/send',
            authMiddleware,
            dtoValidationMiddleware(SendMessageDto, "body"),
            this.controller.sendMessage
        )

    }

}