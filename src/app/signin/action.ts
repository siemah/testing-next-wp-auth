"use server";

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
    const response = await request.json();
    console.log(`response`, response);
  } catch (error) {
    console.log("[Error]", error);
  }
}
