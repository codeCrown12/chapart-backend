import { Options } from 'nodemailer/lib/mailer';
import nodemailer from "nodemailer"
import { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME } from "../config";

class EmailService {

    private transport: nodemailer.Transporter

    constructor () {
        this.initializeTransport()
    }

    private initializeTransport () {
        this.transport = nodemailer.createTransport({
            host: MAIL_HOST,
            port: Number(MAIL_PORT),
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD
            }
        })
    }

    public async sendEmail (to: string | string[], subject: string, message: string) {
        const mailOptions: Options = {
            from: `"Eonace" <${MAIL_USERNAME}>`,
            to: to,
            subject: subject,
            html: message
        }
        return await this.transport.sendMail(mailOptions)
    }

}

export default new EmailService()