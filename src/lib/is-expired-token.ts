import { SessionPayload } from "@/types/session-payload";
import { JWTPayload } from "jose";

export const isExpiredToken = (
  payload: (JWTPayload & SessionPayload) | null
): boolean => {
  if (!payload?.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);

  return payload.exp < currentTime;
};
