import '../App.css'

function Header({rightContext}) {
  return (
    <header>
      <div className='brand_header'>
        <img src="/public/Vector.png" alt="" />
        <h1>RedSeam Clothing</h1>
      </div>
      <div className='right_side'>{rightContext}</div>
      </header>
  )
}

export default Header