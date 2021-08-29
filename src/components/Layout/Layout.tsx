import React, {useState} from 'react';

interface Props {
    children: React.ReactNode
    header: React.ReactNode
}

enum Theme {
    LIGHT="theme-light",
    DARK="theme-dark"
}

export const Layout: React.FC<Props> = ({children, header}) => {
    const [theme, setTheme] = useState(Theme.LIGHT);

    return (
        <div className={`flex flex-col h-screen ${theme}`}>
            <header>
                {header}
            </header>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
};