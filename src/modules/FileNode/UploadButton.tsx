import React, {ChangeEvent, createRef, useCallback, useEffect, useState} from 'react';
import {IconButton} from "../../components/Button";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {FileNodeState} from "./state";
import {upload} from "../../api/file";
import {useCreateFileNodeMutation} from "../../api/types";

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

        createFileNodeMutation({
            variables: {
                meta: {
                    path: currentPath,
                    name: selectedFile.name,
                    description: "",
                    isFolder: false,
                    mimeType: selectedFile.type
                }
            }
        }).then((node) => {
            reload()
            return node
        }).then((node) => {
            return upload(`${node.data?.createFileNode.id}`, newFile)
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

