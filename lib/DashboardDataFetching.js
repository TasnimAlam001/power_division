"use client";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";

const DashboardDataFetching = () => {
  const [axiosSecure] = useAxiosSecure();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(() => {
    if (dashboardData && dashboardData.startDate && dashboardData.endDate) {
      return { from: dashboardData.startDate, to: dashboardData.endDate };
    } else {
      return { from: "", to: "" };
    }
  });

  useEffect(() => {
    setLoading(true);
    if (selectedDates && selectedDates.from && selectedDates.to) {
      axiosSecure(
        `/dashboard?start_date=${selectedDates.from}&end_date=${selectedDates.to}`
      )
        .then((res) => {
          setDashboardData(res.data.data);
          console.log("res");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      axiosSecure("/dashboard")
        .then((res) => {
          setDashboardData(res.data.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [selectedDates, axiosSecure]);
  useEffect(() => {
    setSelectedDates(dashboardData.startDate, dashboardData.endDate);
    console.log(
      "in dashboardComponent",
      dashboardData.startDate,
      dashboardData.endDate
    );
  }, [dashboardData]);

  return { dashboardData, loading };
};

export default DashboardDataFetching;
