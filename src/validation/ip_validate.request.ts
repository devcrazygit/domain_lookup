import { Schema } from "express-validator";

export const IpV4ValidateRequestSchema: Schema = {
  ip: {
    in: ["body"],
    notEmpty: true,
  },
};
