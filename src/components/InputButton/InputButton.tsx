import React from 'react';
import {Input} from "../Input";
import {IconButton, IconButtonProps} from "../Button";

export interface InputButtonProps {
    inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    iconButtonProps: IconButtonProps
}

export const InputButton: React.FC<InputButtonProps> = ({
    inputProps: {className: inputClassName, ...inputProps},
    iconButtonProps: {className: buttonClassName, ...iconButtonProps},
}) => {
    return (
        <div className="form-control pl-1 pr-1">
            <div className="relative">
                <Input className={`w-full ${inputClassName ? inputClassName : ""}`} type="text" {...inputProps}/>
                <IconButton
                    className={`absolute top-0 -right-2 rounded-l-none rounded-l-none ${buttonClassName ? buttonClassName : ""}`}
                    notRounded {...iconButtonProps} />
            </div>
        </div>
    )
};

