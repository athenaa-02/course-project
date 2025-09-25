import { useState } from "react";
import LogoutButton from "./LogoutButton";
import cartLogo from "../assets/cartLogo.png";
import avatarPlaceholder from "../assets/Portrait_Placeholder.png";

function RightContext2() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutButtonToggle = () => {
    setIsOpen(!isOpen);
  };
  let user = null;
try {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
}
  const avatar = user?.avatar || avatarPlaceholder;
//   console.log(user)
  return (
    <>
      <div className="right_context2">
        <img className="small_menu_cart" src={cartLogo} alt="" />

        <img className="small_menu_avatar" src={avatar}></img>
        <div
          className="logout_button_wrapper"
          onClick={handleLogoutButtonToggle}
        >
          {isOpen && <LogoutButton />}
        </div>
      </div>
    </>
  );
}

export default RightContext2;
