import { useState, useEffect } from "react";

export function useFetch(mainUrl, additionalRoute, method, obj = null) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
         if (!mainUrl) return
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
        } else if (method === "POST") {

            async function postDataByFetch(mainUrl, additionalRoute, obj) {
                try {
                    const response = await fetch(mainUrl + additionalRoute, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", },
                        body: JSON.stringify(obj)
                    })
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
            postDataByFetch(mainUrl, additionalRoute, obj)
        }

        else {
            setError("Unsupported method")
        }
    }, [mainUrl, additionalRoute, method ,JSON.stringify(obj)])
    return { data, loading, error }
}