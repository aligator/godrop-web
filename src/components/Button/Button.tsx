import React from 'react';
import {DefaultColorThemes} from "../Common";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    color?: DefaultColorThemes
    activeColor?: DefaultColorThemes
    className?: string
}

export const Button: React.FC<ButtonProps> = ({color = "primaryBg", activeColor = "primaryBgSoft", className="", ...rest}) => {
    const colorUpper = `${color[0].toUpperCase()}${color.slice(1)}`
    const activeColorUpper = `${activeColor[0].toUpperCase()}${activeColor.slice(1)}`

    return <button className={`bg-${color} text-on${colorUpper} active:bg-${activeColor} active:text-on${activeColorUpper} shadow hover:shadow-lg ${className}`} {...rest} />
};

