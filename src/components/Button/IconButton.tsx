import React from 'react';
import {Button, ButtonProps} from "./Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface Props extends Omit<ButtonProps, "children"> {
    icon: IconProp
}

export const IconButton: React.FC<Props> = ({className, icon, ...rest}) => {
    return (
        <Button className={`flex flex-row justify-center p-0 w-16 h-16 rounded-full ${className || ""}`} {...rest}>
            <FontAwesomeIcon alignmentBaseline="middle" className="flex-1 w-full h-full p-3" icon={icon} />
        </Button>
    )
};
