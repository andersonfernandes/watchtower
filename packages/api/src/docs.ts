import { generateDocs, generateSchemas } from "@/swagger/generator";

(async () => {
  generateSchemas();
  await generateDocs();
})();
