import { ThemeProvider } from "@mui/material";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";
import webTheme from "../theme";

export default async function Dashboard() {
  
  //Getting session from auth
  const session = await auth();
  console.log("----------------------")
  console.log("session: ", session)
  console.log("----------------------")
  if(!session) redirect("/api/auth/signin");

  return (
    <main>
      <ThemeProvider theme={webTheme}>
        <DashboardComponent />
      </ThemeProvider>
    </main>
  );
}
