import Header from "../../components/Header";
import { login } from "../../services/auth";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import brandImg from "../../assets/brandImg.png";
import RightContext from "../../components/RightContext";
import { useNavigate } from "react-router-dom";
import eyeLogo from "../../assets/eyeLogo.png";
import { loginSchema } from "../../components/Validations";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [focused, setFocused] = useState({});
  const handleFocus = (name) => setFocused({ ...focused, [name]: true });
  const handleBlur = (name) => setFocused({ ...focused, [name]: false });

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
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await login(formData);
      console.log("login success:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/products");
    } catch (err) {
      console.error("API Error:", err.response?.data || err);
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
      }

      if (err.response?.data?.errors) {
        const apiErrors = err.response.data.errors;
        Object.keys(apiErrors).forEach((key) => {
          newErrors[key] = apiErrors[key][0];
        });
      }
      if(err.response?.data?.message){
        newErrors.general = err.response.data.message
      }
      setErrors(newErrors);
      console.log("Mapped errors:", newErrors);
    }
  };
  return (
    <>
      <Header rightContext={<RightContext/>}></Header>
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
                className={errors.general ? "error_input" : ""}
                required
              />
              <p className="error_text">{errors.general}</p>
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder={`${focused["password"] ? "" : "password"}`}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                className={errors.general ? "error_input" : ""}
                required
              />
              <p className="error_text">{errors.general}</p>
              <span
                className={`asterisk third_asterisk ${
                  focused["password"] || formData.password ? "hidden" : ""
                }`}
              >
                *
              </span>
              <img
                onClick={() => setShowPassword(!showPassword)}
                src={eyeLogo}
                alt=""
              />
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
