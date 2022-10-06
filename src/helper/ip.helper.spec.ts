import { validateIpV4 } from "./ip.helper";

describe(validateIpV4, () => {
  it("should return true for valid ipv4 string", () => {
    expect(validateIpV4("1.1.1.1")).toBe(true);
    expect(validateIpV4("192.168.100.1")).toBe(true);
    expect(validateIpV4("255.255.255.255")).toBe(true);
  });
  it("should return false for invalid ipv4 string", () => {
    expect(validateIpV4(".1.1.1.1")).toBe(false);
    expect(validateIpV4("256.100.100.100.100"));
    expect(validateIpV4("10000"));
    expect(validateIpV4("abc"));
  });
});
