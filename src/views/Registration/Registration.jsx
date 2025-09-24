import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { register } from "../../services/auth";
import "./Registration.css";
import brandImg from "../../assets/brandImg.png";
import userLogo from "../../assets/userLogo.png";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const Registration = () => {
  const headerPart = (
    <div className="user_wrapper">
      <img src={userLogo} alt="" />
      <Link className="login_link" to={"/"}>
        log in
      </Link>
    </div>
  );

  const [focused, setFocused] = useState();
  const navigate = useNavigate();
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
      navigate("/products");
    } catch (error) {
      console.error("registration failed:", error.response.data);
    }
  };

  return (
    <>
      <Header rightContext={headerPart}></Header>
      <main className="registration_main">
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
                placeholder={`${focused ? "" : "Username"}`}
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required
              />
              <span className={`asterisk first_asterisk ${focused ? "hidden" : ""}`}>*</span>

              <span className={`asterisk ${focused ? "hidden" : ""}`}>*</span>
            </div>
            <div className="input_wrapper">
              <input
                type="email"
                placeholder={`${focused ? "" : "Email"}`}
                name="email"
                value={formData.email}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleChange}
                required
              />
              <span className={`asterisk second_asterisk ${focused ? "hidden" : ""}`}>*</span>
            </div>
            <div className="input_wrapper">
              <input
                type="password"
                placeholder={`${focused ? "" : "Password"}`}
                name="password"
                value={formData.password}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleChange}
                required
              />
              <span className={`asterisk third_asterisk ${focused ? "hidden" : ""}`}>*</span>
            </div>

            <div className="input_wrapper">
              <input
                type="password"
                placeholder={`${focused ? "" : "Confirm password"}`}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required
              />
              <span className={`asterisk fourth_asterisk ${focused ? "hidden" : ""}`}>*</span>
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
