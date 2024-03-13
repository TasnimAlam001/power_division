import { auth } from "@/app/auth";
import axios from "axios";


export default function AxiosInstance(forLogin=false) {


  if(forLogin){
    return axios.create({
      baseURL: "http://172.17.0.87:16999/api/web-app",
    }); 
    
  }else{
    // const session = await auth();
    // const token = session.user.token;
    const token = localStorage.getItem("access-token");

    return axios.create({
      baseURL: "http://172.17.0.87:16999/api/web-app",
      headers: {'Authorization': `Bearer ${token}`}
    });
  }

  // axiosInstance.interceptors.request.use((config) => {
  //   const token = session.user.token;
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });
  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     if (
  //       error.response &&
  //       (error.response.status === 401 || error.response.status === 403)
  //     ) {
  //       redirect("/login", { scroll: true });
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  
}



/*

  // useEffect(() => {
  //   setLoading(true);
  //   // nProgress.start();

  //   console.log(AxiosInstance);
  //   AxiosInstance().get("/dashboard")
  //     .then((res) => {
  //       setLoading(false);
  //       setDashboardData(res.data.data);
  //       // nProgress.done();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setLoading(false);
  //       // nProgress.done();
  //     });


  // }, []);









*/