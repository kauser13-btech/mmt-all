'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authAPI } from '../lib/api'
import Cookies from 'js-cookie'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = Cookies.get('token')
        const userData = Cookies.get('user')

        if (token && userData) {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)

          try {
            const freshUserData = await authAPI.user()
            setUser(freshUserData)
            Cookies.set('user', JSON.stringify(freshUserData), { expires: 7 })
          } catch (error) {
            console.error('Failed to fetch fresh user data:', error)
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      await authAPI.csrf()
      const data = await authAPI.login(credentials)
      setUser(data.user)
      setIsAuthenticated(true)
      return { success: true, data }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      await authAPI.csrf()
      const data = await authAPI.register(userData)
      setUser(data.user)
      setIsAuthenticated(true)
      return { success: true, data }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      const errors = error.response?.data?.errors
      return { success: false, error: message, errors }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      Cookies.remove('token')
      Cookies.remove('user')
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}