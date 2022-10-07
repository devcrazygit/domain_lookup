import dns from "dns";

export const resolveDnsLookup = (domain: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true, family: 4 }, (error, addresses) => {
      if (error) {
        return reject(error);
      }
      resolve(addresses.map((item) => item.address));
    });
  });
};
