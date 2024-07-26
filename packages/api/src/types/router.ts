import User from "@/db/models/User";
import { Request, Response } from "express";

import { Query, Send, ParamsDictionary } from "express-serve-static-core";

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

export interface AppResponse<ResBody> extends Response {
  json: Send<{ success: boolean; data: ResBody | { errors: string[] } }, this>;
}
