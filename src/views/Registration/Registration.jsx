import { useEffect } from "react"
import { register } from "../../services/auth"

const Registration = () =>{
// useEffect(() =>{
// const getProducts = async () =>{
//     try{
//        const response = await getProductsInfo()
//     }
//     catch(error){

//     }
//  }
// getProducts()
// }, [])

    const [formData, setFormData] = useState({
        email: '',
        avatar: '',
        password: '',
        username: '',
    })

    const handleChange = (e) =>{
        setFormData({
            ...formData,
        })
    }

const submitHandler = async(e) =>{
    e.preventDefault()
try{
const response = await register(formData)
console.log(response.data)
}
catch(error){
console.error('registration failed:', error.response.data)
}
}

    return <>
<form onSubmit={submitHandler}>
    <input type="email" name="email" value={formData.email} onChange={handleChange} />
    </form>    
</>
}

export default Registration