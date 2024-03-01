"use server";

import { cookies } from "next/headers";
import cookie from "cookie";
import { redirect } from "next/navigation";

export async function signin(fd: FormData) {
  try {
    const url = `https://soukesmar.com/wp-json/zz-mobile-app/v1/auth/signin`;
    const credentials = {
      phone: fd.get("phone_number"), // 556768787
      password: fd.get("password"), // qweQWE123
    };
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const rawCookie = request.headers.get("set-cookie");
    const expires = rawCookie?.match(/expires=[^;]+;?/g);
    const rawCookieWithouExpires = rawCookie?.replace(/expires=[^;]+;?/g, "");
    rawCookieWithouExpires?.split(", ").map((cookieItem, index) => {
      const parsedCookie = cookie.parse(cookieItem);
      const [[name, value]] = Object.entries(parsedCookie);
      // @ts-ignore
      const res = cookies().set(name, value, {
        domain: parsedCookie.domain,
        maxAge: parsedCookie?.["Max-Age"],
        path: parsedCookie.path,
        expires: expires?.[index],
        httpOnly: true,
        secure: true,
      });
      // console.log(`cookie ${name} added`, res.get(name));
    });
    // request.headers
    //   .getSetCookie()
    //   .map((current) => console.log(`cookie ->`, cookie.parse(current)));
    // const _cookies = cookies();
    // _cookies.set("_uid", `${Date.now()}`);
    const response = await request.json();
    // console.log(`response`, response.code);
    // return response;
  } catch (error) {
    console.log("[Error]", error.message);
    // return error;
  }
  redirect("/dashboard");
}
