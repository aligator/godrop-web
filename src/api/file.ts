import {FileNode} from "./types";

export async function upload(id: string, file: File): Promise<void> {
    const data = new FormData()
    data.append('file', file)

    await fetch(`http://localhost:8080/file/${id}`, {
        method: 'POST',
        body: data
    })
}

export async function download(file: FileNode): Promise<void> {
    const link = document.createElement("a")
    link.download = file.name
    link.href = `http://localhost:8080/file/${file.id}`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

