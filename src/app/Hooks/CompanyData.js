"use client";
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiousSecure";

export default function CompanyData({ id }) {
  const [axiosSecure] = useAxiosSecure();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/companyDashboard/${id}`)
      .then((res) => {
        setCompanyData(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error hoisee fetching a", e);
        setLoading(false);
      });
  }, [axiosSecure,id]);

  return [companyData, loading];
}
