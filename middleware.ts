import { authMiddleware } from "@clerk/nextjs/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/"])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})


// export default authMiddleware({});

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};