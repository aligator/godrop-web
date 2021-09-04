import React, {useCallback, useState} from 'react';
import { Switch } from '../Switch';

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
            <header className="flex flex-row  bg-primaryBg text-onPrimaryBg ">
                <div className="flex-1">{header}</div> 
                <div className="flex items-center mr-2">
                    <Switch checked={theme === Theme.LIGHT} onChange={switchTheme} />
                </div>
            </header>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
};