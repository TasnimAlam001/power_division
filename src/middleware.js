import { auth, signOut } from "@/app/auth";



export  default auth(async(req) => {
  console.log("auth in middleware", !!req.auth);
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  if (nextUrl.pathname == "/login") return null;
  if (!isLoggedIn && nextUrl.pathname !== "/login") {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && req.auth.user?.type.type === "company") {
    const companyId = req.auth.user.type.company_id;

    if (nextUrl.pathname.startsWith(`/dashboard/utilities/${companyId}`)) {
      return null;
    }
    if (
      nextUrl.pathname.startsWith("/dashboard/allTickets") ||
      nextUrl.pathname.startsWith("/dashboard/allTickets/ticketId/")
    ) {
      return null;
    }

    // If not allowed, redirect to the utility dashboard
    return Response.redirect(new URL(`/dashboard/utilities/${companyId}`, nextUrl));
  }

});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
