import React from 'react';

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{}

export const Input: React.FC<InputProps> = ({ className, ...rest}) => {
    return <input className={`input h-10 m-1 ${className || ""}`} {...rest} />
};

