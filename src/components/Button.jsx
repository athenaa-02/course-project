const Button = ({ type = "button", children, onClick }) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {children}
    </button>
  );
};

export default Button;
