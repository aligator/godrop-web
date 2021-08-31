import React, {memo, MouseEvent, useCallback, useMemo} from 'react';

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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            <tr key={getRowId(row)} className={onClick || onDoubleClick ? "cursor-pointer hover:bg-primaryBg" : ""}>
                {columns.map((col) => {
                    return (
                        <td key={col.name}
                            className={`px-6 py-4 whitespace-nowrap`}
                            onClick={onClick}
                            onDoubleClick={onDoubleClick}
                        >
                            <col.Cell className={onClick || onDoubleClick ? "cursor-pointer hover:text-onPrimaryBg" : ""} row={row} />
                        </td>
                    )
                })}
            </tr>
        )
    }, [columns, getRowId])

    const rows = useMemo(
        () => data.map(renderRow),
        [renderRow, data]
    )

    return (
        <table className="w-full divide-y divide-neutralBgSoft">
            <thead className="bg-neutralBg">
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutralBgSofter">
                {rows}
            </tbody>
        </table>
    )
}

export const DataTable = memo(InternalDataTable)