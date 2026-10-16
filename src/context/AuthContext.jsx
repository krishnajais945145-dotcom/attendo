import React, { createContext, useContext, useState, useEffect } from 'react'
import { dataService } from '../services/dataService'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [isRecoveryMode, setIsRecoveryMode] = useState(false)

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast(null)
    }, 4500)
  }

  const dismissToast = () => setToast(null)

  useEffect(() => {
    // Check if URL hash contains Supabase recovery access_token
    const hash = window.location.hash || ''
    const path = window.location.pathname || ''
    if (hash.includes('type=recovery') || path.includes('reset-password')) {
      setIsRecoveryMode(true)
    }

    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsRecoveryMode(true)
        }
      })
      return () => {
        subscription?.unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    async function loadUser() {
      try {
        const profile = await dataService.getCurrentProfile()
        setUser(profile)
      } catch (err) {
        console.error('Failed to restore session:', err)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (email, password, selectedGroup = null) => {
    setLoading(true)
    try {
      const res = await dataService.signIn(email, password, selectedGroup)
      let profile = await dataService.getCurrentProfile()
      if (selectedGroup && profile) {
        profile = { ...profile, lab_group: selectedGroup }
      }
      setUser(profile || res.user)
      const currentGroup = selectedGroup || profile?.lab_group || 'P1'
      showToast(`Welcome back, ${profile?.full_name || 'Student'}! Logged in as Group ${currentGroup}.`, 'success')
      return profile || res.user
    } catch (error) {
      showToast(error.message || 'Login failed. Please verify credentials.', 'error')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    setLoading(true)
    try {
      const res = await dataService.signUp(userData)
      const profile = await dataService.getCurrentProfile()
      setUser(profile || res.user)
      showToast(`Account created! Your Student ID is ${profile?.student_id || res.user?.student_id}`, 'success')
      return profile || res.user
    } catch (error) {
      showToast(error.message || 'Signup failed.', 'error')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await dataService.signOut()
      setUser(null)
      showToast('Logged out successfully.', 'info')
    } catch (error) {
      showToast(error.message || 'Error signing out.', 'error')
    }
  }

  const resetPassword = async (email) => {
    try {
      await dataService.resetPassword(email)
      showToast(`Password reset link sent to ${email}`, 'success')
    } catch (error) {
      showToast(error.message || 'Failed to send reset link.', 'error')
      throw error
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      await dataService.updateUserPassword(newPassword)
      setIsRecoveryMode(false)
      showToast('Password updated successfully! You can now log in.', 'success')
      if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.pathname)
      }
    } catch (error) {
      showToast(error.message || 'Failed to update password.', 'error')
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      const updated = await dataService.updateProfile(updates)
      setUser(updated)
      showToast('Profile updated successfully.', 'success')
      return updated
    } catch (error) {
      showToast(error.message || 'Failed to update profile.', 'error')
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        isRecoveryMode,
        setIsRecoveryMode,
        updateProfile,
        toast,
        showToast,
        dismissToast,
        isCloudConnected: dataService.isCloudConnected()
      }}
    >
      {children}
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
