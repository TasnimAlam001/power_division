import { auth } from "../src/app/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function AxiosSecure() {

  const axiosSecure = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
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
        redirect("/login", { scroll: true });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
