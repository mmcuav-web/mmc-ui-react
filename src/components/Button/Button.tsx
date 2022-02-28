import React, { FC } from "react"
import classNames from "classnames"

export interface ButtonProps {
    type: "primary" | "danger" | "info"
}

export const Button: FC<ButtonProps> = (props) => {

    const { children, type } = props

    const className = classNames({
        "mmc-button": true,
        "mmc-button-primary": type === "primary"
    })

    return (
        <button
            type="button"
            className={className}
        >
            {children}
        </button>
    )
}