import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const session = await cookies();
  const token = session.get("access_token")?.value;
  if (!token) return null;

  try {
    const result = await scalekit.validateToken(token);
    const user = await scalekit.user.getUser(result?.sub);
    return user;
  } catch (error) {
    // access token এর মেয়াদ শেষ, refresh token দিয়ে নতুন নিন
    const refreshToken = session.get("refresh_token")?.value;
    if (!refreshToken) return null;

    try {
      const newTokens = await scalekit.refreshAccessToken(refreshToken);
      // নতুন token cookie এ লিখুন (Scalekit refresh token ঘুরিয়ে ব্যবহার করে, নতুন refreshToken অবশ্যই সংরক্ষণ করুন)
      session.set("access_token", newTokens.accessToken, { httpOnly: true, path: "/" });
      session.set("refresh_token", newTokens.refreshToken, { httpOnly: true, path: "/" });
      
      const result = await scalekit.validateToken(newTokens.accessToken);
      const user = await scalekit.user.getUser(result?.sub);
      return user;
    } catch {
      return null;
    }
  }
}