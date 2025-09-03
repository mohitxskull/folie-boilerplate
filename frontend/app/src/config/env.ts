import * as z from "zod/mini";

export const env = z
  .object({
    NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY: z.string().check(z.minLength(1)),

    NEXT_PUBLIC_BACKEND_URL: z._default(
      z.optional(z.string().check(z.minLength(1), z.url())),
      "http://localhost:3333",
    ),

    NEXT_PUBLIC_FRONTEND_URL: z._default(
      z.optional(z.string().check(z.minLength(1), z.url())),
      "http://localhost:3000",
    ),

    NEXT_PUBLIC_NODE_ENV: z._default(
      z.optional(z.enum(["development", "production"])),
      "production",
    ),
  })
  .parse({
    NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY: process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  });
