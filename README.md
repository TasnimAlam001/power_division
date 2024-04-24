This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


<!-- 


  const isSystemEnableDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // const getLocalStorageMode = () => {
  //   if (typeof  window !== "undefined") {
  //     const mode = localStorage.getItem("mode");
  //     return mode === "dark" ? "dark" : "light";
  //   }else{
  //     return prefersDarkMode === 'dark' ? 'dark': 'light';
  //   }
  // };

  //-----------Dark mode -----
  const defaultMode = isSystemEnableDarkMode ? "dark" : "light";

  const [mode, setMode] = useState(defaultMode);
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const modeChangeHandler = () => {
    let currentMode = mode == "light" ? "dark" : "light";
    setMode(currentMode);

    window.location.reload();
  };

  useEffect(() => {
    const localStorageMode = localStorage.getItem("mode");
    if (localStorageMode) {
      setMode(localStorageMode);
    } else {
      isSystemEnableDarkMode ? setMode("dark") : setMode("light");
    }

    // console.info(isSystemEnableDarkMode, localStorageMode);

    // const localStorageDark = localStorageMode === "dark";

    // if (dark !== localStorageDark) {
    //   localStorage.setItem("mode", dark ? "dark" : "light");
    //   // Reload the page only if the localStorage mode and current state are different
    //   if (localStorageDark !== null) {
    //     window.location.reload();
    //   }
    // }
  }, [isSystemEnableDarkMode]);
 -->













 <!-- 
 --------------------login page 



 import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { green } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginSVG from "@/components/LoginSVG/LoginSVG";
import Login from "@/components/Form/Login";

export default function MyLogin() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", width: "100vw", }}
    >
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12} md={4}>
          <Stack sx={{ px: 2 }} direction="column" spacing={2} alignItems={"center"}>
            <Stack
              direction="column"
              alignItems="center"
              sx={{ alignSelf: "center" }}
            >
              <Image
                width={60}
                height={60}
                src="/bdLogo.svg"
                spacing={2}
                alt="ministry of power logo"
              />
              <Typography sx={{ mt: 1 }} variant="body1">
                বিদ্যুৎ জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয়
              </Typography>
            </Stack>
            <Box>
              <Box>
                <Typography fontWeight={300} variant="subtitle2">
                  Welcome back!
                </Typography>
                <Typography fontWeight={700} variant="h6" sx={{ mb: 4 }}>
                  Login to your account.
                </Typography>
              </Box>
              <Login />
              <ToastContainer />
              <Typography variant="caption" sx={{ textAlign: "center" }}>
                Don`t have an account?{" "}
                <span style={{ color: green[900], fontWeight: 600 }}>
                  Sign up
                </span>
              </Typography>
            </Box>
          </Stack>
          <Typography sx={{ fontSize: 12, mt: 8, textAlign: "center" }}>
            © 2023, All Rights Reserved. Developed By{" "}
            <span style={{ color: "#00ACF3" }}>Digicon Technologies ltd.</span>
          </Typography>
        </Grid>
        <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={7}>
          {/* Login SVG */}
          <LoginSVG />
        </Grid>
      </Grid>
    </Stack>
  );
}

  -->