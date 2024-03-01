import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { validateRequest } from "./libs/auth";

export async function middleware(request: NextRequest) {
  // const { user } = await validateRequest();
  const { pathname } = request.nextUrl;
  const _cookie = cookies();
  const _headers = headers();
  // console.log(`_cookie--------------->`, _cookie);
  // console.log(`_headers--------------->`, _headers);
  try {
    console.log(
      `[[[[[[[[[[[[[[[[pathname: ${pathname}]]]]]]]]]]]]]]]]]`,
      _cookie.get("_uid")?.value,
    );
    let hdrs = new Headers(_headers);
    hdrs.append("Cookie", `${_cookie.get("_uid")?.value}`);
    hdrs.append("Set-Cookie", `${_cookie.get("_uid")?.value}`);
    let req = await fetch(
      `https://soukesmar.com/wp-json/zz-mobile-app/v1/auth/refresh`,
      {
        headers: {
          Cookie: `${_cookie.get("_uid")?.value}`,
          "Set-Cookie": `${_cookie.get("_uid")?.value}`,
        },
      },
    );
    let res = await req.json();
    console.log(`response2 ===---->`, res);
    req = await fetch(
      `https://soukesmar.com/wp-json/zz-mobile-app/v1/auth/refresh`,
      {
        headers: _headers,
      },
    );
    res = await req.json();
    console.log(`response ===---->`, res);
    req = await fetch(
      `https://soukesmar.com/wp-json/zz-mobile-app/v1/auth/refresh`,
      {
        headers: hdrs,
      },
    );
    res = await req.json();
    console.log(`response ===---->`, res);
  } catch (error) {
    // @ts-ignore
    console.log(`error----->`, error);
  }
  // const isSignedIn = user !== null && user !== undefined;
  // const isSignInPath = pathname.includes("/signin") === true;

  // if (isSignedIn === false && isSignInPath === false) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  // if (isSignedIn === true && isSignInPath === true) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // if (user?.role === "client" && pathname.includes("/tickets") === false) {
  //   return NextResponse.redirect(new URL("/tickets", request.url));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - to match api (API routes) add `api|` to the regexp between `!` and `_next`
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
  ],
};
