import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

// make vitest expect extends all matchers from jest machers
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

