import swaggerAutogen from "swagger-autogen";
import { _schema } from "../dist/_schema";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Home Guardian",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "",
    },
  ],
  schemas: _schema.definitions,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "../swagger/swagger_output.json";
const endpointsFiles = ["../src/routes/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
