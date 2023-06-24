import {JSX} from "react";

export interface IButton {
    className?: string;
    variant?: "primary" | "secondary" | "square";
    children: JSX.Element | string | JSX.Element[];
}