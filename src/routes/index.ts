import { NextFunction, Request, Response } from "express";
import { RootController } from "../api/root.controller";
import { HistoryController } from "../api/v1/history.controller";
import { ToolsController } from "../api/v1/tools.controller";
import validate from "../middleware/validate";
import { IpV4ValidateRequestSchema } from "../validation/ip_validate.request";
import { LookupQuerySchema } from "../validation/lookup.query";

type Route = {
  name: string;
  method: "post" | "get" | "delete" | "put";
  path: string;
  middleware?: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (data: any) => Promise<any>;
};

const routes: Route[] = [
  {
    name: "Index",
    method: "get",
    path: "/",
    handler: RootController.get,
  },
  {
    name: "Lookup domain",
    method: "get",
    path: "/v1/tools/lookup",
    middleware: [validate(LookupQuerySchema)],
    handler: ToolsController.lookup,
  },
  {
    name: "Simple IP validation",
    method: "post",
    path: "/v1/tools/validate",
    middleware: [validate(IpV4ValidateRequestSchema)],
    handler: ToolsController.validate,
  },
  {
    name: "List queries",
    method: "get",
    path: "/v1/history",
    handler: HistoryController.get,
  },
];

export default routes;
