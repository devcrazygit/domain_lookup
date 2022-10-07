import { NextFunction, Request, Response } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";
/**
 * Validate request
 * @param validationSchema
 * @returns
 */
const validate =
  (validationSchema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await checkSchema(validationSchema).run(req);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res
      .status(400)
      .json({ errors: errors.array(), message: "Validation Error" });
  };
export default validate;
