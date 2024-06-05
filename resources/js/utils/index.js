import axios from 'axios'

export const setUserId = value => {
    localStorage.setItem('userId', JSON.stringify(value))
}

export const getUserId = () => {
    return JSON.parse(localStorage.getItem('userId'))
}

export const removeUserId = () => {
    localStorage.removeItem('userId')
}

export const apiCall = axios.create({
    baseURL: process.env.REACT_APP_API_PATH
})