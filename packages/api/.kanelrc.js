const { defaultGetMetadata, defaultGenerateIdentifierType } = require("kanel");
const pluralize = require("pluralize");

/** @type {import("kanel").Config} */
module.exports = {
  connection: "postgres://postgres:postgres@localhost:5432/house_watch",
  outputPath: "./src/db/models",
  preDeleteOutputFolder: true,
  enumStyle: "type",
  customTypeMap: {
    "pg_catalog.json": "any",
    "pg_catalog.jsonb": "any",
    "pg_catalog.numeric": "number",
  },
  typeFilter: (type) => type.name !== "pgmigrations",
  getMetadata: (details, generateFor, config) => {
    const metadata = defaultGetMetadata(details, generateFor, config);
    const singularName = pluralize.singular(metadata.name);
    metadata.path = metadata.path.replace(metadata.name, singularName);
    metadata.name = singularName;
    metadata.path = metadata.path.replace("/public", "");
    return metadata;
  },
  generateIdentifierType: (column, details, instantiatedConfig) => {
    const typeDeclaration = defaultGenerateIdentifierType(
      column,
      details,
      instantiatedConfig
    );
    if (column.name === "id") {
      typeDeclaration.name =
        pluralize.singular(typeDeclaration.name.replace(/(.*)Id$/, "$1")) +
        "Id";
    }

    return typeDeclaration;
  },
};
