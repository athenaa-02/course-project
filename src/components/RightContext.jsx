import userLogo from "../assets/userLogo.png";
import { Link } from "react-router-dom";

function RightContext() {
  return (
    <>
     <div className="user_wrapper">
      <img src={userLogo} alt="" />
      <Link className="login_link" to={"/"}>
        log in
      </Link>
    </div>
    </>
  )
}

export default RightContext