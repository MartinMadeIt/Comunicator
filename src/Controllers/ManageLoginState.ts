import { redirect } from "react-router-dom";
import { supabase } from "../databaseClient";


export async function getUSER () {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function signOUT () {
    const { error } = await supabase.auth.signOut()
}

export const loader = async () => {
    const user = await supabase.auth.getUser();
    if (user) {
      return redirect("/login");
    }
};


export interface sendType {
    userId : string,
    username : string,
    comment : string
}

export const sendMessage = async (userId:string, username:string, comment:string) => {

    const { data, error } = await supabase
    .from('messages')
    .insert([
    { user_id: userId, username: username, comment: comment },
    ])
    return data
}

export const getThisUsername  = async (userId:string) => {

    let { data: users, error } = await supabase
    .from('users')
    .select("username")
    .eq('user_id', userId)

    return users
}