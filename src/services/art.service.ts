import { PrismaClient } from "@prisma/client"
import database from "../database"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"

export default class ArtService {

    private dbService: PrismaClient


    constructor() {
        this.dbService = database.getClient()
    }


    public async addArtWork () {
        
    }


    public async updateArtWork () {

    }


    public async deleteArtWork () {

    }
    

}