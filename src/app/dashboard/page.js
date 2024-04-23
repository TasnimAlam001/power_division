import { redirect } from "next/navigation";
import { auth } from "../auth";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";


export default async function Dashboard() {
  // Getting session from auth
  const session = await auth();
  console.log("----------------------");
  console.log("session: ", session);
  console.log("----------------------");

  if (!session) redirect("/api/auth/signin");

  return (
    <main>
      <DashboardComponent />
    </main>
  );
}
