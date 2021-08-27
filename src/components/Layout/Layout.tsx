import React from 'react';

interface Props {
    children: React.ReactNode
    header: React.ReactNode
}

export const Layout: React.FC<Props> = ({children, header}) => {
    return (
        <div className="flex flex-col h-screen">
            <header style={{background: "blue"}}>
                {header}
            </header>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
};