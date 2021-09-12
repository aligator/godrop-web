import {useCallback, useState} from "react";
import {GetFileNodeQuery, useGetFileNodeQuery} from "../../api/types";

export interface FileNodeStateProps {
    initialPath: string
}

export interface FileNodeState {
    readonly currentPath: string
    readonly change: (newPath: string) => void
    readonly reload: () => void
    readonly back: () => void
    readonly loading: boolean
    readonly node?: GetFileNodeQuery
}

export function useNodeState({initialPath}: FileNodeStateProps): FileNodeState {
    const [path, setPath] = useState(initialPath)

    const { data, error, loading, refetch } = useGetFileNodeQuery({
        variables: { path }
    });

    if (error) {
        // Could call a error-showing context-module later...
        throw error
    }

    const navigateBack = () => {
        setPath((current) => {
            const split = current.split("/")
            return split.slice(0, split.length-1).join("/")
        })
    }

    const reload = useCallback(() => {
        void refetch({path})
    }, [refetch, path])

    return {
        currentPath: path,
        change: setPath,
        reload: reload,
        back: navigateBack,
        loading,
        node: data,
    }
}
