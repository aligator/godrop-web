import React, {ChangeEvent, createRef, useCallback, useEffect, useState} from 'react';
import {useCreateFileNodeMutation} from "../../api/types";
import {IconButton} from "../../components/Button";
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import {FileNodeState} from "./state";

interface Props {
    state: FileNodeState
}

export const CreateFolderButton: React.FC<Props> = ({state: {currentPath, reload}}) => {
    const [createFileNodeMutation] = useCreateFileNodeMutation()
    const [folderName, setFolderName] = useState("")

    const handleFolderNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value)
    }, [])

    const handleCreate = useCallback(() => {
        if (!folderName) {
            return
        }

        const newFolder = folderName
        setFolderName("")

        createFileNodeMutation({
            variables: {
                meta: {
                    path: currentPath,
                    name: newFolder,
                    description: "",
                    isFolder: true,
                }
            }
        }).then(reload)
    }, [folderName, createFileNodeMutation, currentPath, reload])

    return (
        <>
            <IconButton className={"btn-primary"} icon={faFolderPlus} onClick={handleCreate}>Upload</IconButton>
            <input className={"input-primary"} value={folderName} placeholder={"Folder name"} onChange={handleFolderNameChange} />
        </>
    )
};

