import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { UserCookieRecord } from "~/DTO/userCookie";
import { userCookie } from "~/session/cookies.server";

export async function loader({
  request,
}: LoaderFunctionArgs) {
    const cookieString = request.headers.get("Cookie");
    let user = await userCookie.parse( cookieString );
    return defer({isvalid: user.isValid as boolean, token: user.token as string, record:user.record as UserCookieRecord})
}

export default function Play({}) {

  const {isvalid,token,record} =  useLoaderData<typeof loader>()
  return (
    <>
        Welcome to the dashboard
        <br />
        <Link to={'/logout'}>Logout</Link>
    </>
  )
}
