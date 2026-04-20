import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.init.ts";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const registerUser = async (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false),
    );
  };

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false),
    );
  };

  const googleSignIn = async () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false),
    );
  };

  const logout = async () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUser(null);
      setLoading(false);
    });
  };

  const updateUser = async (profile: {
    displayName?: string;
    photoURL?: string;
  }) => {
    return updateProfile(auth.currentUser, profile);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);
      } else {
        console.log("user logged out");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    registerUser,
    user,
    loading,
    updateUser,
    loginUser,
    googleSignIn,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
