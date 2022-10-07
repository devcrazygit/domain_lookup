import { Request } from "express";
import { matchedData } from "express-validator";
import { resolveDnsLookup } from "../../helper/dns_lookup.helper";
import { validateIpV4 } from "../../helper/ip.helper";
import { lookupResponse } from "../../models/lookup.model";
import { LookupRepository } from "../../repository/lookup.repository";

export const ToolsController = {
  lookup: async (req: Request) => {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { domain } = matchedData(req);
    const addresses = await resolveDnsLookup(domain);
    const lookup = await LookupRepository.save({
      clientIp: clientIp as string,
      domain,
      addresses,
    });
    return lookupResponse(lookup);
  },
  validate: async (req: Request) => {
    const { ip } = matchedData(req);
    return {
      status: validateIpV4(ip),
    };
  },
};
