import axios from "axios";
import React, { createContext } from "react";
import { BASE_URL } from "../config";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

type ChildrenProps = {
  children: JSX.Element;
};

export const AuthContext = createContext("");

export const AuthProvider = ({ children }: ChildrenProps) => {
  const register = ({ name, email, password }: RegisterProps) => {
    axios
      .post(`$BASE_URL/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
      });
  };

  return (
    <AuthContext.Provider value={register}>{children}</AuthContext.Provider>
  );
};
