import { useEffect, useMemo, useState } from "react"
import axios from 'axios'

const createUrl = (path, urlParams) => {
  const url = `${process.env.REACT_APP_BASE_URL}/game${path}`
  if (!urlParams)
    return url
  const searchParams = new URLSearchParams(urlParams)
  return `${url}?${searchParams}`
}

const useApiResults = (request, { skipFirstRequest } = {}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // PARAMS: url, method, body, queryParams
  const fetch = useMemo(() => (params) => {
    const { url, method, body, queryParams } = { ...request, ...params }
    return axios[method](createUrl(url, queryParams), body)
      .then(x => {
        setData(x.data)
        return x.data
      })
      .catch(err => {
        setError(err)
        throw new Error(err)
      })
      .finally(() => setIsLoading(false))
  }, [request])

  useEffect(() => {
    if (skipFirstRequest) return
    fetch(request)
  }, [request, skipFirstRequest, fetch])

  return { data, error, isLoading, fetch }
}

export default useApiResults