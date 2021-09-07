import React from 'react';
import {IconButton} from "../../components/Button";
import { faBackward, faSync } from '@fortawesome/free-solid-svg-icons'
import {FileNodeState} from "./state";
import {UploadButton} from "./UploadButton";
import {CreateFolderButton} from "./CreateFolderButton";

interface Props {
    state: FileNodeState
}

export const ActionToolbar: React.FC<Props> = ({state}) => {
    const {reload, back} = state

    return (
        <div className={"flex flex-row bg-base-200"}>
            <IconButton className="btn-primary" icon={faSync} onClick={reload} />
            <IconButton className="btn-primary" icon={faBackward} onClick={back} />
            <UploadButton state={state} />
            <CreateFolderButton state={state} />
        </div>
    )
};

