import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { register } from "../../services/auth";
import brandImg from "../../assets/brandImg.png";
import userLogo from "../../assets/userLogo.png";
import Header from "../../components/Header";
import eyeLogo from "../../assets/eyeLogo.png";
import { Link } from "react-router-dom";
import { validationSchema } from "../../components/validations";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({})


  const headerPart = (
    <div className="user_wrapper">
      <img src={userLogo} alt="" />
      <Link className="login_link" to={"/"}>
        log in
      </Link>
    </div>
  );

  const [focused, setFocused] = useState({});
  const handleFocus = (name) => setFocused({ ...focused, [name]: true });
  const handleBlur = (name) => setFocused({ ...focused, [name]: false });

  const navigate = useNavigate();

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
      if(key === 'avatar' && !formData[key]) return;
      formDataToSend.append(key, formData[key]);
    });
    
    try {
      await validationSchema.validate(formData, {abortEarly:false})
      setErrors({})
      const response = await register(formDataToSend);
      localStorage.setItem("token", response.data.token);
      console.log("success:", response.data);
      navigate("/products");
    } catch (err) {
      console.error("API Error:", err.response?.data || err);
      const newErrors = {}
      if(err.inner){
        err.inner.forEach((e) =>{
          newErrors[e.path] = e.message
        })
      }

      if(err.response?.data?.errors){
        const apiErrors = err.response.data.errors
        Object.keys(apiErrors).forEach((key) =>{
          newErrors[key] = apiErrors[key][0]
        })
      }
      setErrors(newErrors)
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
            <h2>Registration</h2>

            <ImageUpload
              onFileSelect={(file) =>
                setFormData({ ...formData, avatar: file })
              }
            />
            <div className="input_wrapper">
              <input
                type="text"
                name="username"
                placeholder={`${focused["username"] ? "" : "username"}`}
                value={formData.username}
                onChange={handleChange}
                onFocus={() => handleFocus("username")}
                onBlur={() => handleBlur("username")}
                required
                className={errors.username ? 'error_input' : ''}
              />
              {errors.username && <p className="error_text">{errors.username}</p>}
              <span
                className={`asterisk first_asterisk ${
                  focused["username"] || formData.username ? "hidden" : ""
                }`}
              >
                *
              </span>
            </div>
            <div className="input_wrapper">
              <input
                type="email"
                placeholder={`${focused["email"] ? "" : "email"}`}
                name="email"
                value={formData.email}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                onChange={handleChange}
                required
                className={errors.email ? 'error_input' : ''}
              />
              {errors.email && <p className="error_text">{errors.email}</p>}

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
                placeholder={`${focused["password"] ? "" : "password"}`}
                name="password"
                value={formData.password}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                onChange={handleChange}
                required
                className={errors.password ? 'error_input' : ''}
              />
              {errors.password && <p className="error_text">{errors.password}</p>}

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

            <div className="input_wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={`${
                  focused["password_confirmation"] ? "" : "Confirm password"
                }`}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                onFocus={() => handleFocus("password_confirmation")}
                onBlur={() => handleBlur("password_confirmation")}
                required
                className={errors.password_confirmation ? 'error_input' : ''}
              />
              {errors.password_confirmation && <p className="error_text">{errors.password_confirmation}</p>}

              <span
                className={`asterisk fourth_asterisk ${
                  focused["password_confirmation"] ||
                  formData.password_confirmation
                    ? "hidden"
                    : ""
                }`}
              >
                *
              </span>
              <img
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                src={eyeLogo}
                alt=""
              />
            </div>

            <Button type="submit">Register</Button>
          </form>
          <div>
            <span>Already member?</span>
            <Link className="login_link" to={"/"}>
              log in
            </Link>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Registration;
