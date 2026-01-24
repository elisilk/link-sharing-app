import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  NUXT_SESSION_PASSWORD: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  BLOB_READ_WRITE_TOKEN: z.string(),
  NUXT_PUBLIC_BLOB_STORAGE_URL: z.string(),
  NUXT_PUBLIC_BLOB_STORAGE_BASE: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
