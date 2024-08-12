import { getMe } from "@/actions/get-me";
import { SessionPayload } from "@/types/session-payload";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;
const refreshKey = new TextEncoder().encode(refreshTokenKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
export async function refreshdecrypt(refreshToken: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(
      refreshToken,
      refreshKey,
      {
        algorithms: ["HS256"],
      }
    );
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifySession() {
  const token = cookies().get("sessions")?.value;
  const payload = await decrypt(token);

  const { me, error } = await getMe();

  if (error && !payload?.userId) {
    redirect("/sign-in");
  }

  return {
    me,
  };
}
