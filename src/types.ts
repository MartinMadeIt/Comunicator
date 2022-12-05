import React from "react"

export type ClickEventFormType = React.FormEvent<HTMLFormElement>

export type ClickEventButtonType = React.MouseEvent<HTMLButtonElement, MouseEvent>

export type ChildrenType = {
    children: React.ReactNode
}

export interface valueType  {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type Log_infos = [{
    id?: number   /* primary key */;
    created_at?: string;
    username?: string // type unknown;
    password?: string // type unknown;
    user_id?: string // type unknown;
    email?: string // type unknown;
  }];