import { Request } from 'express';
import path from 'path';
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    filename: ( req: Request, file: Express.Multer.File, callback: FileNameCallback ) => {
        callback(null, 'art'+ Date.now().toString() + uuidv4() + path.extname(file.originalname))
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    }
    else callback(null, false)
}

export default multer({storage, fileFilter})