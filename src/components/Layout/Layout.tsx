import React, {useCallback, useState} from 'react';

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

    const switchTheme = useCallback(() => {
        setTheme((current) => {
            switch (current) {
                case Theme.LIGHT:
                    return Theme.DARK
                case Theme.DARK:
                default:
                    return Theme.LIGHT
            }
        })
    }, [])

    return (
        <div className={`flex flex-col h-screen ${theme}`}>
            <header className="flex flex-row">
                <div className="flex-1">{header}</div> <button onClick={switchTheme}>Switch</button>
            </header>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
};