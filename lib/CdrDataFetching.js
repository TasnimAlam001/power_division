import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";

const CdrDataFetching = () => {
  const [axiosSecure] = useAxiosSecure();
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/cdr")
      .then((res) => {
        console.log(res)
        setLoading(false);
        setCdrData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [axiosSecure]);

  return { cdrData, loading };
};

export default CdrDataFetching;
