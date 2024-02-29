"use server";

export async function signin(fd: FormData) {
  try {
    const url = `https://data-source.zzenz.com/wp-json/zz-mobile-app/v1/auth/signin`;
    const credentials = {
      email: fd.get("phone_number"),
      password: fd.get("password"),
    };
    console.log(`credentials`, credentials);
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
