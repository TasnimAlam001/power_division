import { auth } from "@/app/auth";

export default auth((req) => {
  console.log("auth in middleware", !!req.auth);
  console.log("auth in middleware", req.auth.user.type.type);
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  if (nextUrl.pathname == "/login") return null;

  if (!isLoggedIn && nextUrl.pathname != "/login")
    return Response.redirect(new URL("/login", nextUrl));
  
  if (isLoggedIn && req.auth.user.type.type === "company") {
    const companyId = req.auth.user.type.company_id;
    const allowedRoute = `/dashboard/utilities/${companyId}`;

    if (nextUrl.pathname === allowedRoute) {
      return null;
    } else {
      // Redirect to the allowed route
      return Response.redirect(new URL(allowedRoute, nextUrl));
    }
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
