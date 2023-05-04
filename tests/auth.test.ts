import request from "supertest"
import server from "../src/app"

afterEach(async () => {
    await server.database.disconnect()
})


const LOGIN_ROUTE = '/v1/auth/login',
INCORRECT_LOGIN_CREDENTIALS = {
    email: 'monkeydluffy@gmail.com',
    password: '1246'
},
INCOMPLETE_LOGIN_CREDENTIALS = {
    email: 'merahi.idugal@gotgel.org'
}
describe('POST /v1/auth/login', () => {

    it('should throw error when no credentials are provided', async () => {
        const response = await request(server.app).post(LOGIN_ROUTE).send({})
        expect(response.statusCode).toBe(400)
    })

    it('should throw error when incomplete credentials are provided', async () => {
        const response = await request(server.app).post(LOGIN_ROUTE).send(INCOMPLETE_LOGIN_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

    it('should throw error when incorrect credentials are provided', async () => {
        const response = await request(server.app).post(LOGIN_ROUTE).send(INCORRECT_LOGIN_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

})


const SIGNUP_ROUTE = '/v1/auth/signup',
INCORRECT_SIGNUP_CREDENTIALS = {
    email: "merahi.idugal@gotgel.org",
    username: "joyboy",
    firstname: "sanji",
    lastname: "vinsmoke",
    password: "1234",
    is_artist: false
},
INCOMPLETE_SIGNUP_CREDENTIALS = {
    email: "spider.idugal@gotgel.org",
    username: "heart",
    firstname: "law"
}
describe('POST /v1/auth/signup', () => {

    it('should throw error when no credentials are provided', async () => {
        const response = await request(server.app).post(SIGNUP_ROUTE).send({})
        expect(response.statusCode).toBe(400)
    })

    it('should throw error when incomplete credentials are provided', async () => {
        const response = await request(server.app).post(SIGNUP_ROUTE).send(INCOMPLETE_SIGNUP_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

    it('should throw error when email already exists', async () => {
        const response = await request(server.app).post(SIGNUP_ROUTE).send(INCORRECT_SIGNUP_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

})


const SEND_OTP_ROUTE = '/v1/auth/get_token',
INCORRECT_SEND_OTP_CREDENTIALS = {
    email: 'burk.idugal@gotgel.org'
}
describe('POST /v1/auth/get_token', () => {

    it('should throw error if no email is provided', async () => {
        const response = await request(server.app).post(SEND_OTP_ROUTE).send({})
        expect(response.statusCode).toBe(400)
    })

    it('should throw error if the email provided does not exist', async () => {
        const response = await request(server.app).post(SEND_OTP_ROUTE).send(INCORRECT_SEND_OTP_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

})


const VERIFY_OTP_ROUTE = '/v1/auth/verify_token',
INCOMPLETE_VERIFY_OTP_CREDENTIALS = {
    token: '787135'
},
INCORRECT_VERIFY_OTP_CREDENTIALS = {
    token: '787135',
    email: 'merahi.idugal@gotgel.org'
}
describe('POST /v1/auth/verify_token', () => {

    it('should throw error if no credentials are provided', async () => {
        const response = await request(server.app).post(VERIFY_OTP_ROUTE).send({})
        expect(response.statusCode).toBe(400)
    })

    it('should throw error if incomplete credentials are provided', async () => {
        const response = await request(server.app).post(VERIFY_OTP_ROUTE).send(INCOMPLETE_VERIFY_OTP_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

    it('should throw error if incorrect credentials are provided', async () => {
        const response = await request(server.app).post(VERIFY_OTP_ROUTE).send(INCORRECT_VERIFY_OTP_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

})


const CHANGE_PASSWORD_ROUTE = '/v1/auth/change_password',
INCOMPLETE_CHANGE_PWD_CREDENTIALS = {
    token: '787135',
    password: '1234'
},
INCORRECT_CHANGE_PWD_CREDENTIALS = {
    token: '787135',
    email: 'merahi.idugal@gotgel.org',
    password: '1234'
}
describe('POST /v1/auth/change_password', () => {

    it('should throw error if no credentials are provided', async () => {
        const response = await request(server.app).put(CHANGE_PASSWORD_ROUTE).send({})
        expect(response.statusCode).toBe(400)
    })

    it('should throw error if incomplete credentials are provided', async () => {
        const response = await request(server.app).put(CHANGE_PASSWORD_ROUTE).send(INCOMPLETE_CHANGE_PWD_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

    it('should throw error if incorrect credentials (token or email) are provided', async () => {
        const response = await request(server.app).put(CHANGE_PASSWORD_ROUTE).send(INCORRECT_CHANGE_PWD_CREDENTIALS)
        expect(response.statusCode).toBe(400)
    })

})