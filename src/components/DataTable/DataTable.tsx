import React, {memo, useCallback, useMemo} from 'react';

// https://www.tutorialguruji.com/javascript/how-to-use-props-with-generics-with-react-memo/
declare module "react" { // augment React types
    function memo<A, B>(Component: (props: A) => B): (props: A) => ReactElement | null
    // return type is same as ReturnType<ExoticComponent<any>>
}

export interface Col<T> {
    id: string
    name: string
    Cell: (props: {row: T, className?: string}) => JSX.Element | null
}

interface Props<T> {
    getRowId: (row: T) => string
    columns: Col<T>[]
    data: T[]
    Header?: (props: {name: string}) => JSX.Element | null
    rowProps: {
        onClick?: (row: T) => ((event: React.MouseEvent<HTMLTableDataCellElement>) => void) | undefined
        onDoubleClick?: (row: T) => ((event: React.MouseEvent<HTMLTableDataCellElement>) => void) | undefined
    };
}

function InternalDataTable<T>({columns, getRowId, Header=({name})=><>{name}</>, data, rowProps={}}: Props<T>) {
    const headers = useMemo(() => {
        return columns.map((col) => {
            return  (
                <th
                    key={col.name}
                    scope="col"
                >
                    <Header name={col.name} />
                </th>
            )
        })
    }, [columns, Header])

    const renderRow = useCallback((row: T) => {
        const onClick = rowProps?.onClick && rowProps.onClick(row)
        const onDoubleClick = rowProps?.onDoubleClick && rowProps.onDoubleClick(row)



        return (
            <tr key={getRowId(row)} className={onClick || onDoubleClick ? "hover" : ""}>
                {columns.map((col) => {
                    return (
                        <td key={col.name}
                            onClick={onClick}
                            onDoubleClick={onDoubleClick}
                        >
                            <col.Cell className={onClick || onDoubleClick ? "cursor-pointer" : ""} row={row} />
                        </td>
                    )
                })}
            </tr>
        )
    }, [columns, getRowId, rowProps])

    const rows = useMemo(
        () => data.map(renderRow),
        [renderRow, data]
    )

    return (
        <table className="table w-full">
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