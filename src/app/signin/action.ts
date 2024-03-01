"use server";

import { cookies } from "next/headers";
import cookie from "cookie";

export async function signin(fd: FormData) {
  try {
    const url = `https://soukesmar.com/wp-json/zz-mobile-app/v1/auth/signin`;
    const credentials = {
      phone: fd.get("phone_number"), // 556768787
      password: fd.get("password"), // qweQWE123
    };
    console.log(`anf dz credentials-->`, credentials);
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log("----------------------------");
    const rawCookie = request.headers.get("set-cookie");
    const expires = rawCookie?.match(/expires=[^;]+;?/g);
    const rawCookieWithouExpires = rawCookie?.replace(/expires=[^;]+;?/g, "");
    console.log(
      "---------------=======-------------",
      expires,
      // rawCookieWithouExpires,
      // cookie.parse(`${rawCookieWithouExpires}`),
    );
    rawCookieWithouExpires?.split(", ").map((cookieItem, index) => {
      const parsedCookie = cookie.parse(cookieItem);
      const [[name, value]] = Object.entries(parsedCookie);
      // @ts-ignore
      const res = cookies().set(name, value, {
        domain: parsedCookie.domain,
        maxAge: parsedCookie?.["Max-Age"],
        path: parsedCookie.path,
        expires: expires?.[index],
        secure: true,
      });
      console.log(`cookie ${name} added`, res);
    });
    // request.headers
    //   .getSetCookie()
    //   .map((current) => console.log(`cookie ->`, cookie.parse(current)));
    // const _cookies = cookies();
    // _cookies.set("_uid", `${Date.now()}`);
    const response = await request.json();
    console.log(`response`, response.code);
    return response.code;
  } catch (error) {
    console.log("[Error]", error);
    return error;
  }
}
