// useTicketData.js
import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";

const useTicketData = (selectedDates) => {
  const [axiosSecure] = useAxiosSecure();
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (selectedDates) {
      axiosSecure(`/ticket?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
        .then((res) => {
          setLoading(false);
          setTicketData(res.data.data);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      axiosSecure("/ticket")
        .then((res) => {
          setLoading(false);
          setTicketData(res.data.data);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [selectedDates, axiosSecure]);

  return { ticketData, loading };
};

export default useTicketData;
