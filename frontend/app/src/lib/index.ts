import { env } from "@/config/env";

export const frontendUrl = (segment: string) => {
  return new URL(segment, env.NEXT_PUBLIC_FRONTEND_URL);
};
