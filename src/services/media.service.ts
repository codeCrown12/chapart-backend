import { UploadApiResponse, v2 } from "cloudinary"

export default class MediaService {

    async uploadFile (
        file: Express.Multer.File
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            return v2.uploader.upload(file.path, (error, value) => {
                if (error) reject(error)
                resolve(value as UploadApiResponse)
            })
        })
    }

}