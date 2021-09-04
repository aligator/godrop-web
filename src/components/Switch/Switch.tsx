import React, { createRef, MouseEvent, useCallback } from 'react';
import './switch.css'

export interface SwitchProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    checked: boolean
}

export const Switch: React.FC<SwitchProps> = ({className, checked, ...rest}) => {
    const inputRef = createRef<HTMLInputElement>()

    const fakeClick = useCallback((e: MouseEvent) => {
        inputRef.current?.click()
    }, [inputRef])

    return (
        <div className={`relative inline-block w-10 align-middle select-none transition duration-200 ease-in ${className || ''}`}>
            <input ref={inputRef} checked={checked} type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-neutralBg text-onNeutralBg border-4 appearance-none cursor-pointer" {...rest} />
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutralBg cursor-pointer"  onClick={fakeClick}></label>
        </div>
    )
};

