import { jwtVerify, SignJWT } from "jose";

export interface UserJwtPayload {
  jti: string;
  iat: number;
  userId: string;
  username: string;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      { clockTolerance: 120 } // Allow 2 minutes of clock skew
    );
    return verified.payload as unknown as UserJwtPayload;
  } catch (err) {
    console.error("JWT Verification failed:", err);
    throw new Error("Your token has expired or is invalid.");
  }
};

export const createToken = async (userId: string, username: string) => {
  const token = await new SignJWT({ userId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime("24h") // Token expires in 24 hours
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  
  return token;
};
