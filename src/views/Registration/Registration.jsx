import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { register } from "../../services/auth";
import Header from "../../components/Header/Header";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

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
    username: "",
    password: "",
    password_confirmation: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (!formData.avatar) {
      alert("Please upload an avatar");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      alert("passwords do not match");
      return;
    }
    try {
      const response = await register(formDataToSend);
      console.log("success:", response.data);
    } catch (error) {
      console.error("registration failed:", error.response.data);
    }
  };

  return (
    <>
      <Header rightContext={"registration"}></Header>
      <form onSubmit={submitHandler}>
        <ImageUpload
          onFileSelect={(file) => setFormData({ ...formData, avatar: file })}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default Registration;
