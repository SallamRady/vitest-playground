=============================================

# Section Num #1

=============================================

## Why Vitest?

- test runner for vite
- features
  - faster performance
  - seamless react itegrations
  - similar to jest
  - shows test results (pass/fail)

---

## Add Vitest to current vite react ts app

- Installation
  <br/>
  <code>npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event</code>

- Update vite.config.ts

```
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});

```

- Create a Setup File for Testing <code>src/setupTests.ts</code>

```ts
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

// make vitest expect extends all matchers from jest machers
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

- After that go to <code>./tsconfig.app.json</code>and add
  `"types":["vitest/globals","@testing-library/jest-dom"]`

- Add a Test Script to package.json

```
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch"
}
```
=============================================

# Section Num #2

=============================================
### Important Vitest like Jest

```
import { it, describe,expect } from "vitest";
```

- vi object === jest object that mean ==> vi.fn() === jest.fn()
- it() === test()
- describe() === describe()
- expect() === expect()
- matchers -> as you know from jest
- queries to select elemenet from screen -> as you know
- TDD -> as you know
- user event package -> as you know

### Vitest Hooks

Also if you are interested, here are the other hooks that are available in Vitest:
So depending on what you need to do, you can use the appropriate hook.

```tsx
import { beforeAll, afterAll, beforeEach, afterEach } from "vitest";

// Runs once before all tests
beforeAll(() => {
  // Setup that needs to happen once before any tests run
});

// Runs once after all tests complete
afterAll(() => {
  // Cleanup that needs to happen once after all tests finish
});

// Runs before each individual test
beforeEach(() => {
  // Setup that needs to happen before every test
});

// Runs after each individual test
afterEach(() => {
  // Cleanup that needs to happen after every test
});
```

Common use cases for each hook:

1. beforeAll:

   - Database connections
   - Setting up test servers
   - Loading shared test data
   - One-time expensive setup operations

2. afterAll:

   - Closing database connections
   - Shutting down test servers
   - Cleaning up test files/data
   - Final cleanup operations

3. beforeEach:

   - Resetting test state
   - Setting up fresh test data
   - Initializing component renders
   - Setting up new mock implementations

4. afterEach:
   - Clearing mocks
   - Cleaning up DOM
   - Resetting component state
   - Clearing temporary test data




=============================================

# Section Num #3 MSW

=============================================

=>REST Client Extention Info :: REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.

### Integration MSW

1 - Install MSW `npm install msw@latest --save-dev`
2 - create `src/mocks/handlers.ts` file set handlers on it like that
<br/>

```ts
import { http, HttpResponse } from "msw";
import { type Post } from "../components/Posts/PostsList";

// helpers
const posts: Post[] = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
];

// msw handlers
export const handlers = [
  http.get(`http://localhost:4000/posts`, async () => {
    return HttpResponse.json(posts);
  }),
];
```

3 - create `src/mocks/server.ts` file setup our server.
<br/>

```ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

export default server;
```

4- in any test file you need use tests import server and set its configration

```ts
import server from "./mocks/server";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
```

Example

```ts
import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import PostsList from "./components/Posts/PostsList";
import server from "./mocks/server";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("test fetchs posts list from server", async () => {
  render(<PostsList />);
  screen.debug();
  const posts = await screen.findAllByTestId("post-content");

  expect(posts).toHaveLength(3);
});
```




---

screen.debug(); // this command show dom on termainal like console.log()

---