import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GetAccessToken() {
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  

  return token?.token as string | null;
}
