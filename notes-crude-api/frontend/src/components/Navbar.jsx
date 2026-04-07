
import  {Link}  from 'react-router-dom'
const Navbar = () => {
  return (
  <nav>
    <div className="logo">
      <h1>Logo</h1>
    </div>
    <div className="links">
      <Link to='/'>Home</Link>
      <Link to='/notes'>Notes</Link>
    </div>
  </nav>
  )
}

export default Navbar