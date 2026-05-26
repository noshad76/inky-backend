import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: err.issues,
    })
  }

  return res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  })
}
