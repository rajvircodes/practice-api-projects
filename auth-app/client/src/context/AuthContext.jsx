import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios' // Import your axios instance

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true) // Added loading state

  // Persist user session on refresh
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Verify token and get user data from backend
          const response = await API.get('/auth/me'); 
          setUser(response.data);
        } catch (error) {
          console.error("Session expired or invalid token",error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = (userData, tokenData) => {
    localStorage.setItem('token', tokenData)
    setToken(tokenData)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}