import Header from "../../components/Header";
import { login } from "../../services/auth";
import Button from "../../components/Button";
import userLogo from "../../assets/userLogo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import brandImg from "../../assets/brandImg.png";
import { useNavigate } from "react-router-dom";
import eyeLogo from '../../assets/eyeLogo.png'

function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const [focused, setFocused] = useState({});
  const handleFocus = (name) => setFocused({ ...focused, [name]: true });
  const handleBlur = (name) => setFocused({ ...focused, [name]: false });

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
            <div className="input_wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                placeholder={`${focused["email"] ? "" : "Email"}`}
                onBlur={() => handleBlur("email")}
                required
              />
              <span
                className={`asterisk second_asterisk ${
                  focused["email"] || formData.email ? "hidden" : ""
                }`}
              >
                *
              </span>
            </div>
            <div className="input_wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                placeholder={`${focused["password"] ? "" : "password"}`}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                required
              />
              <span
                className={`asterisk third_asterisk ${
                  focused["password"] || formData.password ? "hidden" : ""
                }`}
              >
                *
              </span>
              <img onClick={() => setShowPassword(!showPassword)} src={eyeLogo} alt="" />

            </div>
            <Button type="submit">Log in</Button>
          </form>
          <div>
            <span>Not a member?</span>
            <Link className="login_link" to={"/registration"}>
              Register
            </Link>
          </div>
        </aside>
      </main>
    </>
  );
}

export default Login;
