import { cookies } from "next/headers";
import { verifyAuth } from "./auth";

export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return false;
    
    await verifyAuth(token);
    return true;
  } catch (err) {
    return false;
  }
}
