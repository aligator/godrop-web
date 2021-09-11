import React, {ChangeEvent, useCallback, useState} from 'react';
import {useCreateFileNodeMutation} from "../../api/types";
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import {FileNodeState} from "./state";
import {InputButton} from "../../components/InputButton";

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
        <InputButton
            inputProps={{
                className: "input-primary",
                value: folderName,
                onChange: handleFolderNameChange,
                placeholder: "Folder name"
            }}
            iconButtonProps={{
                className: "btn-primary",
                icon: faFolderPlus,
                onClick: handleCreate
            }} />
    )
};

