import { createCookie } from "@remix-run/node"; // or cloudflare/deno


export let userCookie = createCookie("user",{
        maxAge:60 * 60 * 24 * 30,
        path : '/',
        httpOnly : true,
        sameSite : "lax",
        secure: process.env.NODE_ENV === "production",
        secrets : ["Array", "of" ,"secrets"]
})
