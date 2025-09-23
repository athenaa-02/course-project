import { useEffect, useState } from "react";
import { register } from "../../services/auth";

const Registration = () => {
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
    email: "",
    avatar: "",
    password: "",
    username: "",
    confirmPassword:"",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response.data);
    } catch (error) {
      console.error("registration failed:", error.response.data);
    }
  };

  return (
    <>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        
      </form>
    </>
  );
};

export default Registration;
