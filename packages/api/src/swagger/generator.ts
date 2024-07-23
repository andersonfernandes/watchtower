import fs from "fs";
import path from "path";
import swaggerAutogen from "swagger-autogen";
import * as tjs from "typescript-json-schema";

export const generateSchemas = () => {
  console.info("Generating Schemas");

  const settings = {
    required: true,
    ref: false,
  };
  const compilerOptions = {
    strictNullChecks: true,
  };

  const schemasPath = "src/types/schemas/index.ts";
  const program = tjs.getProgramFromFiles(
    [path.resolve(schemasPath)],
    compilerOptions,
    "./"
  );

  const schema = tjs.generateSchema(program, "*", settings);
  fs.writeFileSync(
    "src/swagger/_schema.ts",
    "// THIS FILE IS AUTO-GENERATED BY swagger/generate.ts\n" +
      "export const _schema = " +
      JSON.stringify(schema, null, 4) +
      ";"
  );
};

export const generateDocs = async () => {
  console.info("Generating Swagger Docs");
  const schema = await import("./_schema");

  const doc = {
    info: {
      version: "v1.0.0",
      title: "House Watch",
    },
    servers: [
      {
        url: `${process.env.BASE_URL ?? "http://localhost:5000"}/api`,
        description: "",
      },
    ],
    schemas: schema._schema.definitions,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  };

  const outputFile = "src/swagger/docs.json";
  const endpointsFiles = ["src/routes/index.ts"];

  swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
};
