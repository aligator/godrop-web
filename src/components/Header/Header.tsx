import React, {ReactNode} from 'react';

interface Props {
    children?: ReactNode
}

export const Header: React.FC<Props> = ({children= null}) => {
    return (
        <div className="flex flex-row">
            <div className="flex-grow-0 font-logo text-3xl p-2">
                Go<span className="font-extrabold">Drop</span>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    )
};