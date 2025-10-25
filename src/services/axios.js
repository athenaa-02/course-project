import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.redseam.redberryinternship.ge/api",
    headers:{
        Accept:"application/json",
        "Content-Type": "application/json"
    }
})


// export const instance2 = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com'
// })


export default instance