import User from "@/db/models/User";
import { Request, Response } from "express";
import { ParamsDictionary, Query, Send } from "express-serve-static-core";
import { ErrorResponse, SuccessResponse } from "./schemas";

export interface AppRequest<
  B = {},
  P extends ParamsDictionary = {},
  Q extends Query = {}
> extends Request {
  user?: User;
  body: B;
  params: P;
  query: Q;
}

export interface AppResponse<B = {}> extends Response {
  json: Send<B | ErrorResponse, this>;
}
