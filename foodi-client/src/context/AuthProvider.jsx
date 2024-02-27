import React, { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import app from '../firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  //  signup method : Create an account
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //   signup with gmail
  const signUpwithGamil = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  //   Login method: login with email and password
  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  //   Logout method
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  //   update profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
  }

  //   check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setLoading(false)
      } else {
      }
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    createUser,
    signUpwithGamil,
    login,
    logOut,
    updateUserProfile,
    loading,
    setLoading,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
