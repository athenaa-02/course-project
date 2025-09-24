import Header from "../../components/Header";
import { login } from "../../services/auth";
import Button from "../../components/Button";
import userLogo from "../../assets/userLogo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import brandImg from "../../assets/brandImg.png";
import { useNavigate } from "react-router-dom";

function Login() {


  const headerPart = (
    <div className="user_wrapper">
      <img src={userLogo} alt="" />
      <Link className="login_link" to={"/"}>
        log in
      </Link>
    </div>
  );

  const navigate = useNavigate();
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
      <Header rightContext={headerPart}></Header>
      <main style={{ display: "flex" }}>
        <aside className="img_aside">
          <img src={brandImg} alt="" />
        </aside>
        <aside className="form_aside">
          <form onSubmit={submitHandler}>
            <h2>Log in</h2>
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
        </aside>
      </main>
    </>
  );
}

export default Login;
