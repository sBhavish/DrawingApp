import { createCookieSessionStorage, createSessionStorage } from "@remix-run/node";

type User = {
  userId: string;
  isValid: boolean;
  token:string;
};
type SessionFlashData = {
  error: string;
};

export const {commitSession, destroySession, getSession} = createCookieSessionStorage<User, SessionFlashData>({
    cookie:{
        name: "user",
        maxAge:60 * 60 * 24 * 30,
        path : '/',
        httpOnly : true,
        sameSite : "lax",
        secure: process.env.NODE_ENV === "production",
        secrets : ["Array", "of" ,"secrets"]
    }
})

export const storeUserInSession = async (user: Pick<UserCookieRecord,"id">) =>{
    const session = await getSession();
    session.set("userId", user.id)
    const header = await commitSession(session);
    return header;
}