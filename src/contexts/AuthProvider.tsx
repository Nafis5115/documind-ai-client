import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init.ts";
const AuthProvider = ({ children }) => {
  const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  return (
    <AuthContext.Provider value={"sdasd"}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
