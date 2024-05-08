import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Users } from '~/pb.collections.server';
import pb from '~/pocketbase.server';
import { userCookie } from '~/session/cookies.server';

export const action = async ({ request }:ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const authData = await pb.collection(Users).authWithPassword(email as string, password as string);
  return redirect("/play", {
    headers:{
      "Set-Cookie": await userCookie.serialize({
        record: authData.record,
        isValid : pb.authStore.isValid,
        token: pb.authStore.token
      })
    }
  });
};

export default function Login() {
  return (
    <form method="post">
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}