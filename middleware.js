// import { auth } from "./app/auth";

import { auth } from "./src/app/auth";

export default auth((req) => {
  console.log("auth in middleware", !!req.auth);
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  if (nextUrl.pathname == "/login") return null;

  if (!isLoggedIn && nextUrl.pathname != "/login")
  console.log("Okay")
    return Response.redirect(new URL("/login", nextUrl));
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
