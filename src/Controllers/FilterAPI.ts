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
      .order('message_id', { ascending: true })
    return data as T 
  }
// To zmienione
 export async function fetchSomeRows<T>(table:string, ammount:number) {
    const {data} = await supabase
      .from(`${table}`)
      .select(`*`)
      .order('message_id', { ascending: false })
      .limit(ammount)
      
    return data as T 
  }
  
 export async function getTheCount<T>(table:string) {
  const { data, count } = await supabase
    .from(table)
    .select('*', { count: 'exact' })
    return count as T 
  }


  

  export default fetchUser;