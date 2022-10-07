import { Lookup } from "@prisma/client";

export type LookupModel = {
  clientIp: string;
  domain: string;
  addresses: string[];
};

export const lookupResponse = (lookup: Lookup) => {
  return {
    domain: lookup.domain,
    created_at: lookup.createdAt,
    client_ip: lookup.clientIp,
    addresses: lookup.addresses.map((ip) => ({ ip })),
  };
};
