import { Lookup, Prisma } from "@prisma/client";

export type LookupModel = {
  clientIp: string;
  domain: string;
  addresses: string[];
};
export type LookupResponse = {
  domain: string;
  client_ip: string;
  created_at: number;
  addresses: {
    ip: string;
  }[];
};
export const lookupResponse = (
  lookup: Lookup | Lookup[]
): LookupResponse | LookupResponse[] => {
  if (Array.isArray(lookup)) {
    return lookup.map((item) => lookupResponse(item) as LookupResponse);
  }
  return {
    domain: lookup.domain,
    created_at: Math.round(lookup.createdAt.valueOf() / 1000),
    client_ip: lookup.clientIp,
    addresses: (lookup.addresses as Prisma.JsonArray).map((ip) => ({
      ip: ip as string,
    })),
  };
};
