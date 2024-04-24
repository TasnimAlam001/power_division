// UserDataFetcher.js
import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";

const UserData = () => {
  const [axiosSecure] = useAxiosSecure();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/users")
      .then((res) => {
        setLoading(false);
        setUserData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [axiosSecure]);

  return { userData, loading };
};

export default UserData;
