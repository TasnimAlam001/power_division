
import { Button, ThemeProvider, Typography } from "@mui/material";
// import {signOut} from "next-auth/react"
import { redirect } from "next/navigation";
import { auth } from "../auth";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";
import webTheme from "../theme";

export default async function Dashboard() {
  const authData = await auth();

  console.log("----------------------")
  console.log("authData: ", authData)
  console.log("----------------------")
  if(!authData) redirect("/api/auth/signin");

  return (
    <main>
      <ThemeProvider theme={webTheme}>
        <DashboardComponent />
      </ThemeProvider>
    </main>
  );
}
