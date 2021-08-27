import React, {useCallback, useMemo} from 'react';
import {FileNodeState} from "./state";

interface Props {
    state: FileNodeState
}

export const ChildList: React.FC<Props> = ({state: {currentPath, change, back, node, loading}}) => {
    const createOnNavigateToChild = useCallback((newPath: string) => () => {
        change(`${currentPath}/${newPath}`)
    }, [change, currentPath])

    const list = useMemo(() => {
        return (node?.getFileNode?.children || []).map((child) => {
            if (child.isFolder) {
                return (
                    <li key={child.id}>
                        <button onClick={createOnNavigateToChild(child.name)}>
                            {child.name}
                        </button>
                    </li>
                )
            }

            return (
                <li key={child.id}>
                    {child.name}
                </li>
            )
        })
    }, [node, createOnNavigateToChild])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <ul>
            <li key="..">
                <button onClick={back}>..</button>
            </li>
            {list}
        </ul>
    )
};

