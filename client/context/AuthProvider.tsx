import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const register = (name, email, password) => {
    axios.post`$BASE_URL`;
  };

  return (
    <AuthContext.Provider value="Akintunde">{children}</AuthContext.Provider>
  );
};
