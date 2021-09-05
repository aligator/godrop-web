import React from 'react';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

export const Button: React.FC<ButtonProps> = ({ className, ...rest}) => {
    return <button className={`btn ${className || ""}`} {...rest} />
};

