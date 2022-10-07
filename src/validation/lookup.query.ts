import { Schema } from "express-validator";

export const LookupQuerySchema: Schema = {
  domain: {
    in: ["query"],
    isString: true,
  },
};
