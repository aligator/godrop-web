import React, {useContext, useState, ReactNode, createContext, useCallback} from 'react';

interface Props {
    children: React.ReactNode
}

interface OpenOptions {
    content: ReactNode
}

interface SideDrawerContextData {
    handleOpen: (options: OpenOptions) => void
}

const SideDrawerContext = createContext<SideDrawerContextData | undefined>(undefined)

export const useSideDrawer = (): SideDrawerContextData => {
    const res = useContext(SideDrawerContext)
    if (res === undefined) {
        throw new Error("side drawer not injected")
    }
    return res
}

export const SideDrawer: React.FC<Props> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState<ReactNode>(<></>)

    const handleClose = useCallback(() => {
        setIsOpen(false)
        setTimeout(() => {
            setContent(<></>)
        }, 400)
    }, [])

    const handleOpen = useCallback(({content: newContent}: OpenOptions) => {
        setContent(newContent)
        setIsOpen(true)
    }, [])

    return (
        <>
            <div className={`transform bg-neutralBgSofter border-2 border-neutralBg p-2 text-onNeutralBgSofter right-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${isOpen ? '' : 'translate-x-full'}`}>
                <div className="flex flex-col flex-nowrap">
                    <div className="w-full flex flex-row flex-nowrap justify-end">
                        <button onClick={handleClose}>X</button>
                    </div>
                    <div>{content}</div>
                </div>
            </div>

            <SideDrawerContext.Provider value={{
                handleOpen
            }}>
                {children}
            </SideDrawerContext.Provider>
        </>
    )
};