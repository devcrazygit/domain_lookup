export const validateIpV4 = (input: string): boolean => {
  const IPV4_REGEX =
    /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
  return IPV4_REGEX.test(input);
};
