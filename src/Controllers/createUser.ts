import { SignupFormValues } from "../Components/SignInPage/SignUpPage"
import { supabase } from "../databaseClient"
import insertUser from "./InsertUser"

export const createUser = async (user: SignupFormValues) => {
    // Check if username exists
    const { data: userWithUsername } = await supabase
      .from('users')
      .select('*')
      .eq('username', user.user)
      .single()
  
    if(userWithUsername) {
      throw new Error('User with username exists')
    } 
  
    const { data, error: signUpError } = await supabase.auth.signUp({ 
      email: user.email,
      password: user.password
    })
  
    if(signUpError || !data.user) {
      throw signUpError
    }

    const insert = await insertUser(data.user.id, user)

    return data
  }