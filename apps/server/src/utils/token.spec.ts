import { expect, test } from "vitest";
import { generateOpaqueToken } from "./token";

describe("Token utility", () => {
  test("Check generateOpaqueToken have correct output", () => {
    const token = generateOpaqueToken();

    expect(token).toHaveLength(176);
  });
});
