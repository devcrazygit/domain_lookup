import { lookupResponse } from "../../models/lookup.model";
import { LookupRepository } from "../../repository/lookup.repository";

export const HistoryController = {
  get: async () => {
    const lookups = await LookupRepository.getHistory();
    return lookupResponse(lookups);
  },
};
