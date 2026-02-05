
import { r2, r2BucketName } from "../../config/r2.setup";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

interface UploadType {
    file: Buffer,
    fileName: string,
    mimeType: string,
    directory: string
}

interface DeleteType {
    filePath: string,
}

export async function uploadImageToR2({file, fileName, mimeType, directory} : UploadType) {
    const key = `${directory}/${fileName}`
    await r2.send( new PutObjectCommand({
        Bucket: r2BucketName,
        Key: key,
        Body: file,
        ContentType: mimeType,
    }))
}

export async function deleteImageFromR2({filePath}: DeleteType) {
    await r2.send(new DeleteObjectCommand({
        Bucket: r2BucketName,
        Key: filePath
    }))
}