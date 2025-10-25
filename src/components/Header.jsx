import "../App.css";
import logo from "../assets/logo.jpg";

function Header({ rightContext }) {
  return (
    <header>
      <div className="brand_header">
        <img src={logo} className="logo" alt="" />
        <h1>Linea</h1>
      </div>
      <div className="right_side">{rightContext}</div>
    </header>
  );
}

export default Header;
