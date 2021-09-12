import React, {memo, useCallback, useMemo} from 'react';
import {FileNodeState} from "./state";
import {Col, DataTable} from "../../components/DataTable";
import {useSideDrawer} from "../../components/SideDrawer";
import {IconButton} from "../../components/Button";
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import {download} from "../../api/file";
import {FileNode, useRemoveFileNodeMutation} from "../../api/types";

interface Props {
    state: FileNodeState
}

export const ChildList: React.FC<Props> = memo(({state: {currentPath, change, node, loading, reload}}) => {
    const { handleOpen } = useSideDrawer()
    const [removeFileNodeMutation] = useRemoveFileNodeMutation()

    const handleNavigateToChild = useCallback((newPath: string) => {
        change(`${currentPath}/${newPath}`)
    }, [change, currentPath])

    const handleSelect = useCallback((row: FileNode) => {
        handleOpen({
            content: <div>{row.name}</div>
        })
    }, [handleOpen])

    const handleDownload = useCallback((row: FileNode) => () => download(row), [])
    const handleDelete = useCallback((row: FileNode) => () => {
        removeFileNodeMutation({
            variables: {
                id: row.id
            }
        }).then(() => {
            console.log(currentPath)
            reload()
        })
    }, [currentPath, reload, removeFileNodeMutation])

    const columns: Col<FileNode>[] = useMemo(() => [
        {
            id: "actions",
            name: "Actions",
            Cell: ({row, className}) => {
                if (row.isFolder) {
                    return <div className="flex flex-row">
                        <IconButton icon={faTrash} onClick={handleDelete(row)} />
                    </div>
                }
                return (
                    <div className="flex flex-row">
                        <IconButton icon={faDownload} onClick={handleDownload(row)} />
                        <IconButton icon={faTrash} onClick={handleDelete(row)} />
                    </div>
                )
            }
        },
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
    ], [handleDelete, handleDownload])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
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
});

