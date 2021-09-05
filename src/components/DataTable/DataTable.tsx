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
                    className="px-6 py-3 text-left text-xs font-medium bg-base-300 text-base-content uppercase tracking-wider"
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
            <tr key={getRowId(row)} className={onClick || onDoubleClick ? "cursor-pointer bg-base-200 text-base-content hover:bg-accent-focus hover:text-accent-content" : ""}>
                {columns.map((col) => {
                    return (
                        <td key={col.name}
                            className={`px-6 py-4 whitespace-nowrap`}
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
        <table className="w-full divide-y bg-divide-neutral text-divide-neutral-content">
            <thead className="bg-base-300 text-base-content">
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody className="bg-white divide-y">
                {rows}
            </tbody>
        </table>
    )
}

export const DataTable = memo(InternalDataTable)