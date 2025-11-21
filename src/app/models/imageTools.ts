const getImageMimeType = (filename: string): string => {
    if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return 'image/jpeg';
    if (filename.endsWith(".png")) return 'image/png';
    if (filename.endsWith("gif")) return 'image/gif';
    return 'application/octet-stream';
}

const getImageExtension = (mimeType: string): string | null => {
    switch (mimeType) {
        case "image/jpeg":
            return ".jpeg";
        case  "image/png":
            return ".png";
        case "image/gif":
            return ".gif";
        default:
            return null;
    }
}
export {getImageMimeType, getImageExtension}