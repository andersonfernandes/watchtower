import { db } from "@/db";
import { env } from "@/env";
import { AppRequest, AppResponse } from "@/types/router";
import { UserJWTPayload } from "@/types/schemas";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/docs", "/health", "/users/login"];

export const requireAuth = async (
  request: AppRequest,
  response: AppResponse<any>,
  next: NextFunction
) => {
  if (PUBLIC_PATHS.some((p) => request.path.includes(p))) return next();

  const authHeader = request.get("Authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return response.status(401).json({
      success: false,
      data: { error: "Access denied. No token provided." },
    });
  }

  const invalidTokenResponse = {
    success: false,
    data: { error: "Access denied. Invalid Token." },
  };
  try {
    const decoded = jwt.verify(accessToken, env.JWT_SECRET) as UserJWTPayload;

    const user = await db("users").where("id", decoded.userId).first();
    if (!user) {
      return response.status(401).json(invalidTokenResponse);
    }
    request.user = user;

    next();
  } catch (error) {
    return response.status(401).json(invalidTokenResponse);
  }
};
