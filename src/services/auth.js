import instance from './axios'

export const register = (data) =>{
    return instance.post("/register", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}