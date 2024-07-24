import { db } from "@/db";
import crypto from "crypto";
import bcrypt from "bcrypt";

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
    console.error("Could not seed database", e);
    process.exit(1);
  });
