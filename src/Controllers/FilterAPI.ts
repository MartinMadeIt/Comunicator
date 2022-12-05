import { supabase } from '../databaseClient'
// import React, { useEffect, useState } from 'react';


 async function fetchUser<T>({table, values, filterByColumns, columnValue}:{table:string, values:string, filterByColumns:string, columnValue:string}) {
    const {data} = await supabase
      .from(`${table}`)
      .select(`${values}`)
      .filter(`${filterByColumns}`, 'eq', `${columnValue}`)
    return data as T 
  }
  
 export async function fetchAllRows<T>(table:string) {
    const {data} = await supabase
      .from(`${table}`)
      .select(`*`)
    return data as T 
  }
  

  export default fetchUser;