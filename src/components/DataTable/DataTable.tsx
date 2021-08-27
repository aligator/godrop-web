import React, {memo, useCallback, useMemo} from 'react';

// https://www.tutorialguruji.com/javascript/how-to-use-props-with-generics-with-react-memo/
declare module "react" { // augment React types
    function memo<A, B>(Component: (props: A) => B): (props: A) => ReactElement | null
    // return type is same as ReturnType<ExoticComponent<any>>
}

export interface Col<T> {
    name: string
    renderer: (row: Row<T>) => React.ReactNode
}

export interface Row<T> {
    id: string
    data: T
}

interface Props<T> {
    className?: string
    columns: Col<T>[]
    data: Row<T>[]
    headerRenderer?: (name: string) => React.ReactNode
}

function InternalDataTable<T>({className, columns, headerRenderer=(name)=>name, data}: Props<T>) {
    const headers = useMemo(() => {
        return columns.map((col) => {
            return  <th key={col.name}>{headerRenderer(col.name)}</th>
        })
    }, [columns, headerRenderer])

    const renderRow = useCallback((row: Row<T>) => {
        return (
            <tr key={row.id}>
                {columns.map((col) => {
                    return <td key={col.name}>{col.renderer(row)}</td>
                })}
            </tr>
        )
    }, [columns])

    const rows = useMemo(
        () => data.map(renderRow),
        [renderRow, data]
    )

    return (
        <table className={className}>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export const DataTable = memo(InternalDataTable)