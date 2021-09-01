import React, {useCallback, useMemo} from 'react';
import {FileNodeState} from "./state";
import {Col, DataTable} from "../../components/DataTable";
import {FileNode} from "../../api/types";
import {useSideDrawer} from "../../components/SideDrawer";

interface Props {
    state: FileNodeState
}

export const ChildList: React.FC<Props> = ({state: {currentPath, change, back, node, loading}}) => {
    const { handleOpen } = useSideDrawer()
    const handleNavigateToChild = useCallback((newPath: string) => {
        change(`${currentPath}/${newPath}`)
    }, [change, currentPath])

    const handleSelect = useCallback((row: FileNode) => {
        handleOpen({
            content: <div>{row.name}</div>
        })
    }, [handleOpen])

    const columns: Col<FileNode>[] = useMemo(() => [
        {
            id: "filename",
            name: "Filename",
            Cell: ({row, className}) => {
                if (row.isFolder) {
                    return <div className={className}>{row.name}</div>
                }
                return <div className={className}>{row.name}</div>
            }
        },
        {
            id: "type",
            name: "Type",
            Cell: ({row, className}) => {
                return <div className={className}>{row.isFolder ? "Folder" : row.mimeType}</div>
            }
        }
    ], [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <button onClick={back}>..</button>
            <DataTable<FileNode>
                getRowId={(r) => r.id}
                data={node?.getFileNode?.children || []}
                columns={columns}
                rowProps={{
                    onDoubleClick: row => row.isFolder ? () => handleNavigateToChild(row.name) : undefined,
                    onClick: row => () => handleSelect(row)
                }}
            />
        </>
    )
};

