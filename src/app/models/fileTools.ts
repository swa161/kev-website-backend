const getFileMimeType = (filename: string): string => {
    if (filename.endsWith(".pdf")) return "application/pdf"
    return 'application/octet-stream';
}

const getFileExtension = (mimeType: string): string => {
    switch (mimeType) {
        case "application/pdf":
            return ".pdf";
        default:
            return null;
    }
}

export {getFileMimeType, getFileExtension}