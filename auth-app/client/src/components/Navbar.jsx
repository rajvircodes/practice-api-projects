import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  // Added 'loading' from context
  const { user, token, logout, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Prevent "flicker" while checking if the user is authenticated
  if (loading) {
    return (
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>🔐 AuthApp</Link>
      </nav>
    )
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🔐 AuthApp</Link>
      <div style={styles.links}>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <>
            {/* Displaying the actual user name makes it feel more authentic */}
            <span style={styles.welcome}>Hi, {user?.name || 'User'}</span>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '14px 32px', 
    backgroundColor: '#1a1a2e', 
    color: 'white' 
  },
  logo: { fontSize: '20px', fontWeight: 'bold', color: 'white', textDecoration: 'none' },
  links: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: '#aaa', textDecoration: 'none', fontSize: '15px', transition: '0.3s' },
  welcome: { fontSize: '14px', color: '#4ecca3' }, // New style for the username
  btn: { 
    padding: '8px 18px', 
    backgroundColor: '#e94560', 
    color: 'white',
    border: 'none', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontSize: '15px',
    fontWeight: '600'
  },
}

export default Navbar