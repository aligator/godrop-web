export async function upload(path: string, file: File): Promise<void> {
    const data = new FormData()
    data.append('file', file)

    await fetch(`http://localhost:8080/file${path}`, {
        method: 'POST',
        body: data
    })
}


