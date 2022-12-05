import { SignupFormValues } from '../Components/SignInPage/SignUpPage';
import { supabase } from '../databaseClient'
// import React, { useEffect, useState } from 'react';


 async function insertUser(id:string, user:SignupFormValues) {
    const { data } = await supabase
    .from('users')
    .insert({
      user_id: id,
      username: user.user,
      first_name: user.firstName,
      last_name: user.lastName
    })
    return data
  
  }

  export default insertUser;