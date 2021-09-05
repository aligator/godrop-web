import React from 'react';

export interface SwitchProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    checked: boolean
}

export const Switch: React.FC<SwitchProps> = ({className, checked, ...rest}) => {
    return (
       <input checked={checked} type="checkbox" className="toggle" {...rest} />
    )
};

