import { useState, useEffect } from "react";

export function useFetch(mainUrl, additionalRoute, method) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (method === "GET") {

            async function getDataByFetch(mainUrl, additionalRoute) {
                try {
                    const response = await fetch(mainUrl + additionalRoute)
                    const resData = await response.json();

                    if (resData) {
                        setLoading(false)
                        setData(resData)
                    
                    } else {
                        return "some error occured while fetching"
                    }


                } catch (error) {
                    setError(error)
                     setLoading(false)
                }

            }
            getDataByFetch(mainUrl, additionalRoute)
        } else {
           setError("Unsupported method")
        }
    }, [mainUrl, additionalRoute, method])
    return { data, loading, error }
}