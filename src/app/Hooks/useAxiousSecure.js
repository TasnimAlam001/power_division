"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://202.51.182.190:5412/api/web-app/",
});
const useAxiosSecure = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.status === 403 ||
            error.response.status == "Unauthorized")
        ) {
          signOut();
          router.push("/login", { scroll: true });
        }
        return Promise.reject(error);
      }
    );
  }, [router]);

  return [axiosSecure];
};

export default useAxiosSecure;
