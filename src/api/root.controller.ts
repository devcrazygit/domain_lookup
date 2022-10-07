export const RootController = {
  get: async () => {
    return {
      version: "0.1.0",
      date: Math.round(new Date().valueOf() / 1000),
      kubernetes: false,
    };
  },
};
