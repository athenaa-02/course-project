import instance from './axios'

export const register = (data) =>{
    return instance.post("/register", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}
export const login = (data) =>{
    return instance.post("/login", data, {
        headers:{
            "Content-type": "application/json",
        }
    })
}

export const logout = () =>{
    localStorage.removeItem("token")
}