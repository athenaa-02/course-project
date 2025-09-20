import instance from './axios'

export const register = (data) =>{
    return instance.post("/register", data)
}