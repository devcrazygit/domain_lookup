import dns from "dns";
import { CommonError } from "../exception/common.error";

export const resolveDnsLookup = (domain: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true, family: 4 }, (error, addresses) => {
      if (error) {
        return reject(new CommonError(error.message, 404));
      }
      resolve(addresses.map((item) => item.address));
    });
  });
};
