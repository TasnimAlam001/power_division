import Link from "next/link";
import { green } from "@mui/material/colors";


export default function Home() {
  return (
    <main style={{
      display: "flex",
      marginTop: "90px",
      justifyContent: "center",
     
    }}>
        <div >
          Nothing is here, please <span style={{color: green[400], fontWeight: "600"}}><Link href="/login">Login</Link>  </span>to assess Dashboard
        </div>
    </main>
  );
}
