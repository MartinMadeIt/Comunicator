import { FormikProps } from "formik"
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

  export interface Users {
    user_id: string   /* primary key */;
    username: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  
  export interface Messages {
    user_id: string   /* primary key */;
    created_at?: string;
    comment?: string;
    username?: string   /* foreign key to users.username */;
    users?: Users;
  };

  export interface InputInterface<T> {
    formik:FormikProps<T>,
    name: keyof T,
    type: 'text' | 'password',
    placeholder: string
    value?:string
}