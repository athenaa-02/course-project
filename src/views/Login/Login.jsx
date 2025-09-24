import Header from "../../components/Header";
import { login } from "../../services/auth";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log("login success:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/products");
    } catch (error) {
      console.error("login failed: ", error.response?.data || error.message);
    }
  };
  return (
    <>
      <Header rightContext={<div>log in</div>}></Header>
      <form onSubmit={submitHandler}>
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

        <Button type="submit">Log in</Button>
      </form>
    </>
  );
}

export default Login;
