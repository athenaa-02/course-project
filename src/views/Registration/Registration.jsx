import { useEffect } from "react"
import { register } from "../../services/auth"

const Registration = () =>{
useEffect(() =>{
const getProducts = async () =>{
    try{
       const response = await getProductsInfo()
    }
    catch(error){

    }
 }
getProducts()
}, [])

const submitHandler = async(data) =>{
try{
const response = await register(data)
console.log(response.data)
}
catch(error){

}
}

    return <>
<form onSubmit={submitHandler}>
    register
    </form>    
</>
}

export default Registration