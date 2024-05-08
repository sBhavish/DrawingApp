import { json, redirect } from "@remix-run/node";
import pb from "~/pocketbase.server";
export const loader = async () => {
  pb?.authStore?.clear();
  throw redirect("/login", 303)
};