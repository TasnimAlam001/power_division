import { auth } from "@/app/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function AxiosSecure() {
  const axiosSecure = axios.create({
    baseURL: "http://172.17.0.87:16999/api/web-app",
  });

  const session = await auth();

  axiosSecure.interceptors.request.use((config) => {
    const token = session?.user?.token; // Ensure token exists
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
        (error.response.status === 401 || error.response.status === 403)
      ) {
        redirect("/login", { scroll: true }); // Check redirect function
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
