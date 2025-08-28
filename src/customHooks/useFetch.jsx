import { useState } from "react";

export function useFetch (mainUrl,additionalRoute,method){
   
  const [loading ,setLoading ]=  useState(true)
  const [error ,setError ]=  useState(null)
  const [data ,setData ]=  useState(null)

  if(method==="GET"){

    async function getDataByFetch(mainUrl, additionalRoute){
        try {
            const response = await fetch(mainUrl+additionalRoute )
        const data = await response.json();
           
        if(data){
            setLoading(false)
            setData(resData)
            return resData;
        }else{
            return "some error occured while fetching"
        }

            
        } catch (error) {
            setError(error)
        }
        
    }
  getDataByFetch(mainUrl,additionalRoute)
     }

    return { data , loading , error }
}