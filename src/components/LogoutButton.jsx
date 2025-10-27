import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import Languages from "./Languages.jsx";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <button className="log_out_btn" onClick={handleLogout}>
        Logout
      </button>
      <Languages />
    </>
  );
};

export default LogoutButton;
