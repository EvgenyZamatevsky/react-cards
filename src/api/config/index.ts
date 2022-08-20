import axios from 'axios'

export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true
})

export const instanceAdditional = axios.create({
	baseURL: process.env.REACT_APP_ADDITIONAL_BASE_URL,
	withCredentials: true
})
