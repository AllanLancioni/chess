import axios from 'axios'

export const baseUrlAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

export default baseUrlAxios