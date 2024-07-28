import { db } from "@/db";
import { logger } from "@/utils/logger";
import bcrypt from "bcrypt";
import crypto from "crypto";

(async () => {
  const rawPassword = crypto.randomBytes(5).toString("hex");
  const [admin] = await db("users").insert(
    {
      name: "Super Admin",
      username: "admin",
      password: await bcrypt.hash(rawPassword, 12),
    },
    "*"
  );
  console.log("Admin", { ...admin, password: rawPassword });
})()
  .then(() => {
    console.log("Seed completed!");
    process.exit(0);
  })
  .catch((e) => {
    logger.error("Could not seed database", e);
    process.exit(1);
  });
