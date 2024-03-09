"use client";
import { useEffect, useState } from "react";
import AxiosSecure from "./useAxiousSecure";
// import useAxiosSecure from "./AxiousSecure";

const useAllData = () => {
  const [axiosSecure] = AxiosSecure();
  const [utility, setUtility] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure("/dashboard");
        const utilities = response.data.data;
        setUtility(utilities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return utility;
};

export default useAllData;




// -------------------------------------- tasnim ---------------------------------------

// "use client"
// import { useEffect, useState } from "react";
// import useAxiosSecure from "./useAxiousSecure";

// const useAllData = () => {
//   const [axiosSecure] = useAxiosSecure();
//   const [utility, setUtility] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosSecure("/dashboard");
//         const utilities = response.data.data.companyListWithTickets;

//         // Check if data has changed before updating state
//         if (!arraysAreEqual(utilities, utility)) {
//           setUtility(utilities);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [axiosSecure]);

//   return utility;
// };

// // Function to compare arrays
// const arraysAreEqual = (array1, array2) => {
//   return JSON.stringify(array1) === JSON.stringify(array2);
// };

// export default useAllData;
