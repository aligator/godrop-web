import React, {ChangeEvent, createRef, useCallback, useEffect, useState} from 'react';
import {useCreateFileNodeMutation} from "../../api/types";
import {IconButton} from "../../components/Button";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {FileNodeState} from "./state";

interface Props {
    state: FileNodeState
}

export const UploadButton: React.FC<Props> = ({state: {currentPath, reload}}) => {
    const [createFileNodeMutation] = useCreateFileNodeMutation()
    const [selectedFile, setSelectedFile] = useState<File>()
    const inputRef = createRef<HTMLInputElement>()

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return
        }
        setSelectedFile(e.target.files[0])
    }, [])

    useEffect(() => {
        if (!selectedFile) {
            return
        }

        const newFile = selectedFile
        setSelectedFile(undefined)

        console.log("currentPath", currentPath, selectedFile.name)


        createFileNodeMutation({
            variables: {
                file: newFile,
                meta: {
                    path: currentPath,
                    name: selectedFile.name,
                    description: "",
                    isFolder: false,
                    mimeType: selectedFile.type
                }
            }
        }).then(reload)
    }, [selectedFile, createFileNodeMutation, currentPath, reload])

    const handleUpload = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }, [inputRef])

    return (
        <>
            <input ref={inputRef} className="hidden" type="file" onChange={handleFileChange} />
            <IconButton className={"btn-primary"} icon={faPlus} onClick={handleUpload}>Upload</IconButton>
        </>
    )
};

