"use client"
import AxiosInstance from "./AxiosInstance"


export default async function getCompanyDashboard({id}) {

    const company= await AxiosInstance().get(`/companyDashboard/${id}`)

    if(!company.ok){
        throw new Error("there is an error while fetching the data")
      }
    const companyData= company?.data.data;
  return companyData;
}
