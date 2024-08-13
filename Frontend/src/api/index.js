import axios from "axios"

const accessToken = localStorage.getItem('access-token')
? localStorage.getItem('access-token')
: ''

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
})

