// import useAxiosSecure from "@/app/Hooks/AxiousSecure";
import AxiosSecure from "@/app/Hooks/useAxiousSecure";
import { useEffect, useState } from "react";


const useAllTickets = () => {
  const [axiosSecure] = AxiosSecure();
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure("/ticket?start_date=2023-11-01&end_date=2023-12-31");
        const tickets = response.data.data;
        // console.log("res: ",response);

        // Check if data has changed before updating state
        if (!arraysAreEqual(tickets, ticket)) {
          setTicket(tickets);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return ticket;
};

// Function to compare arrays
const arraysAreEqual = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};

export default useAllTickets;
