import { faker } from "@faker-js/faker";
import { prisma } from "../models";
import { LookupModel } from "../models/lookup.model";
import { LookupRepository } from "./lookup.repository";

describe("LookupRepository", () => {
  beforeEach(async () => {
    await prisma.lookup.deleteMany();
  });
  it("should save data", async () => {
    const data: LookupModel = {
      clientIp: "1.1.1.1",
      domain: "example.com",
      addresses: ["2.2.2.2", "3.3.3.3"],
    };
    const lookup = await LookupRepository.save(data);
    expect(lookup.id).not.toBeNull();
  });
  it("should return latest lookup history (less than 20)", async () => {
    const ls = faker.datatype.number({
      min: 1,
      max: 19,
    });
    const generateLookups = async (length: number) => {
      await Promise.all(
        Array.from(Array(length).keys()).map(() => {
          const data: LookupModel = {
            clientIp: faker.internet.ipv4(),
            domain: faker.internet.domainName(),
            addresses: [faker.internet.ipv4(), faker.internet.ipv4()],
          };
          return LookupRepository.save(data);
        })
      );
    };
    await generateLookups(ls);
    let lookups = await LookupRepository.getHistory();
    expect(lookups.length).toBe(ls);

    const gs = faker.datatype.number({
      min: 20,
      max: 30,
    });
    await generateLookups(gs);
    lookups = await LookupRepository.getHistory();
    expect(lookups.length).toBe(20);
  });
});
