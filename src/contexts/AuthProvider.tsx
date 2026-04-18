import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init.ts";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const registerUser = async (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false),
    );
  };

  const updateUser = async (profile: {
    displayName?: string;
    photoURL?: string;
  }) => {
    return updateProfile(auth.currentUser, profile);
  };

  const userInfo = {
    registerUser,
    user,
    loading,
    updateUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
