// import { useAuthStore } from "@/lib/store/authStore";
// import { useRouter } from "next/router";
import axios from "axios";

// const { logout } = useAuthStore();
// const router = useRouter()

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("arcadia-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       logout()
//       router.push("/auth/login")
//     }

//     return Promise.reject(error);
//   }
// );

export default api;