import * as React from "react";

export interface IAvatarProps {
    imageSrc:string;
}

export interface IAvatar extends React.Component<IAvatarProps> {}
export let IAvatarKey = "IAvatarKey";