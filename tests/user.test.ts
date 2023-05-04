import request from "supertest"
import server from "../src/app"

afterEach(async () => {
    await server.database.disconnect()
})


const GET_USER_ROUTE = '/v1/user/get'
describe('GET /v1/user/get', () => {

    it('should throw error if no authorization header is provided', async () => {
        
    })

})