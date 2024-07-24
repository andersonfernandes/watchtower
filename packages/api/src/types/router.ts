import { Request, Response } from "express";

import { Query, Send } from "express-serve-static-core";

export interface AppRequest<U = {}, T extends Query = {}> extends Request {
  body: U;
  query: T;
}

export interface AppResponse<ResBody> extends Response {
  json: Send<{ success: boolean; data: ResBody | { errors: string[] } }, this>;
}
