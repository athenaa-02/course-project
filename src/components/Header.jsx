import '../App.css'
import Vector from "../assets/Vector.png"

function Header({rightContext}) {
  return (
    <header>
      <div className='brand_header'>
        <img src={Vector} alt="" />
        <h1>RedSeam Clothing</h1>
      </div>
      <div className='right_side'>{rightContext}</div>
      </header>
  )
}

export default Header