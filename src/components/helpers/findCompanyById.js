"use client"
import { useEffect, useState } from "react";

export function FindCompanyById(companies, id) {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const company = companies.find((company) => company.id == id);
    setCompany(company);
  }, [companies, id]);
  return company;
}
