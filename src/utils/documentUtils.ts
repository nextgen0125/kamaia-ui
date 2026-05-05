
/** Converte bytes para string legível — reutilizável em toda a app */
export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Converte MIME type em label curto legível */
export function formatMime(mime?: string | null): string {
    if (!mime) return "Documento"
    const map: Record<string, string> = {
        "application/pdf": "PDF",
        "application/msword": "Word",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word",
        "application/vnd.ms-excel": "Excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel",
        "image/jpeg": "JPEG",
        "image/png": "PNG",
        "image/webp": "WebP",
        "application/zip": "ZIP",
        "application/x-rar-compressed": "RAR",
        "text/plain": "TXT",
    }
    return map[mime] ?? mime.split("/")[1]?.toUpperCase() ?? "Ficheiro"
}