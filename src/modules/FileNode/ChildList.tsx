import React, {useCallback, useMemo} from 'react';
import {FileNodeState} from "./state";
import {Col, DataTable, Row} from "../../components/DataTable";
import {FileNode} from "../../api/types";

interface Props {
    state: FileNodeState
}

export const ChildList: React.FC<Props> = ({state: {currentPath, change, back, node, loading}}) => {
    const createOnNavigateToChild = useCallback((newPath: string) => () => {
        change(`${currentPath}/${newPath}`)
    }, [change, currentPath])

    const columns: Col<FileNode>[] = useMemo(() => [
        {
            name: "Filename",
            renderer: (r) => {
                if (r.data.isFolder) {
                    return <button onDoubleClick={createOnNavigateToChild(r.data.name)}>{r.data.name}</button>
                }
                return <>{r.data.name}</>
            }
        },
        {
            name: "Type",
            renderer: (r) => {
                return <>{r.data.isFolder ? "Folder" : r.data.mimeType}</>
            }
        }
    ], [createOnNavigateToChild])

    const data: Row<FileNode>[] = useMemo(() => (node?.getFileNode?.children || []).map((child) => {
        return {
            id: child.id,
            data: child
        }
    }), [node])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <button onClick={back}>..</button>
            <DataTable<FileNode> data={data} columns={columns}/>
        </>
    )
};

