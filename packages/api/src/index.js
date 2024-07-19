"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 5000;
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.get("/workspaces", function (_, response) {
    var workspaces = [
        { name: "api", version: "1.0.0" },
        { name: "types", version: "1.0.0" },
        { name: "web", version: "1.0.0" },
    ];
    response.json({ data: workspaces });
});
app.listen(port, function () { return console.log("Listening on http://localhost:".concat(port)); });
