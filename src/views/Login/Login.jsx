import Header from "../../components/Header";
import { login } from "../../services/auth";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import {  useState } from "react";
import brandImg from "../../assets/brand.jpg";
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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/products");
    } catch (err) {
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
      if (err.response?.data?.message) {
        newErrors.general = err.response.data.message;
      }
      setErrors(newErrors);
      // console.log("Mapped errors:", newErrors);
    }
  };

  // 1: თითოეული პაროლისთვის შეამოწმე შეიცავს თუ არა ციფრს. დაბეჭდე კონსოლში პაროლი და "YES" ან "NO".

  // 2: დაითვალე რომელი სიმბოლოა (character) ყველაზე ხშირად გამოყენებული და დაბეჭდე კონსოლში.

//   const passwords = [
//     "Hello123",

//     "mypassword",

//     "SecurePass!",

//     "12345678",

//     "Admin@2024",

//     "weakpass",

//     "Strong#Pass1",

//     "password123",

//     "Test$123",

//     "simple",
//   ];

//   passwords.forEach((str) => {
//     if (/\d/.test(str)) {
//       // console.log(`${str} yes`)
//     } else {
//       // console.log(`${str} no`)
//     }
//   });

//   function mostRepeated(passwords) {
//     const count = {};

//     passwords.forEach(password => {
//     for (let char of password) {
//       count[char] = (count[char] || 0) + 1

      
//     }  
//     });
    
// // console.log(count)
//     const maxCount = Math.max(...Object.values(count))

//     const mostRepeated = Object.keys(count).filter(c => count[c] === maxCount)

//     // console.log(maxCount, mostRepeated)
//   }

//   mostRepeated(passwords)





// გვაქვს მოცემული ორი API:

// Users: https://jsonplaceholder.typicode.com/users
// Posts: https://jsonplaceholder.typicode.com/posts
// 1: ორივე api-იდან წამოიღეთ ინფორმაცია და დაბეჭდეთ კონსოლში.

// 2: ორივე API-იდან წამოიღე ინფორმაცია. HTML-ში შექმენი მომხმარებლების სია 
// (პირველი 5 მომხმარებელი). თითოეულზე
//  გამოაჩინე: სახელი, username, email, რამდენი პოსტი აქვს.


// const [users, setUsers] = useState([])
// const [posts, setPosts] = useState([])

// useEffect(() =>{
// const getUsers = async () =>{

//     const response = await instance2.get('/users')
//    setUsers(response.data)
//   //  console.log(response.data)

// }

// const getPosts = async () =>{
//   const response = await instance2.get('/posts')
//   setPosts(response.data)
//   console.log(response.data)
// }
// getUsers()
// getPosts()

// }, [])



  return (
    <>


{/* <div>
  {users.map(user =>(<>
   <p>{user.name} {user.email}</p>
   <p>posts: {posts.filter((post) =>{

return post.userId === user.id 
   }
   ).length} </p>
   </>
  ))}
</div>
 */}



      <Header rightContext={<RightContext />}></Header>
      <main style={{ display: "flex" }}>
        <aside className="img_aside">
          <img src={brandImg} className="brand_img" alt="" />
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
