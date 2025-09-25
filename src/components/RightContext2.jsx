import { useState } from "react";
import LogoutButton from "./LogoutButton";

function RightContext2() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutButtonToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="right_context2">
        <div>cart</div>
        <div>avatar</div>
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
