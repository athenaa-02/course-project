import './Header.css'

function Header({rightContext}) {
  return (
    <header className='header'>
      <div className='logo'>
        {/* <img src="" alt="" /> */}
        <h1>RedSeam Clothing</h1>
      </div>
      <div>{rightContext}</div>
      </header>
  )
}

export default Header