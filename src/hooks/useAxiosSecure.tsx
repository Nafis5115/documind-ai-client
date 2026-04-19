import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { config } from "process";
import { useNavigate } from "react-router-dom";
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout().then(() => navigate("/login"));

          return Promise.reject(error);
        }
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate]);
  return instance;
};

export default useAxiosSecure;
