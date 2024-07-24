import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .default("postgres://postgres:postgres@localhost:5432/watchtower"),
});

const setupEnv = () => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    const errorMessages = Object.entries(error.flatten().fieldErrors).map(
      ([key, value]) => `- ${key}:\t${value}`
    );
    throw new Error(`Invalid environment:\n${errorMessages.join("\n")}`);
  }

  return data;
};

export const env = setupEnv();
