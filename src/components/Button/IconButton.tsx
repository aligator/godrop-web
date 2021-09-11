import React from 'react';
import {Button, ButtonProps} from "./Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
    icon: IconProp
    notRounded?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({className, icon, notRounded= false, ...rest}) => {
    return (
        <Button className={`flex flex-row justify-center min-h-0 p-0 w-10 h-10 ${notRounded ? "" : "rounded-full"} ${className || ""} `} {...rest}>
            <FontAwesomeIcon alignmentBaseline="middle" className="flex-1 w-full h-full p-2" icon={icon} />
        </Button>
    )
};
