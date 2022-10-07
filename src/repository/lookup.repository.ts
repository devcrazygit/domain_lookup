import { Lookup } from "@prisma/client";
import { prisma } from "../models";
import { LookupModel } from "../models/lookup.model";

export const LookupRepository = {
  async save(lookupData: LookupModel): Promise<Lookup> {
    const lookup = await prisma.lookup.create({
      data: {
        ...lookupData,
      },
    });
    return lookup;
  },
  async getHistory(): Promise<Lookup[]> {
    return await prisma.lookup.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });
  },
};
