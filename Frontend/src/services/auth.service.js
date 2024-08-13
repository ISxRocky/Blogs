import { isAxiosError } from "axios"
import { api } from "../api"

export const loginUserService = async data => {
    try{
        const response = await api.post('/auth/login', data)
        console.log(response)
        return response.data
    } catch(error){
        if (isAxiosError(error)){
            console.error('API Error: ', error.response.data.message)
            throw error.response.data.message 
    }
}}

export const registerUserService = async data => {
    try{
        const response = await api.post('/auth/register', data)
        console.log(response)
        return response.data
    } catch(error){
        if (isAxiosError(error)){
            throw error.response.data.message 
    }
}}

export const verifyEmailService = async token => {
    try{
        const response = await api.put(`/auth/verify-email/${token}`)
        console.log(response)
        return response.data
    } catch(error){
        if (isAxiosError(error)){
            throw error.response.data.message 
    }
}}
