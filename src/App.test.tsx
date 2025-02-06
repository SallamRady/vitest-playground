import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import App from "./App";
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

test("renders the app component", () => {
  render(<App />);
  screen.debug();
  expect(screen.getByText(/vite/i)).toBeInTheDocument();
});

test("test posts list components", () => {
  render(<PostsList />);
  const postsTitle = screen.getByTestId("posts-title");

  expect(postsTitle).toBeInTheDocument();
});

test("test fetchs posts list from server", async () => {
  render(<PostsList />);
  screen.debug();
  const posts = await screen.findAllByTestId("post-content");

  expect(posts).toHaveLength(3);
});

describe("simple math tests", () => {
  it("sum operation", () => {
    const sum = 5 + 4;
    expect(sum).toBe(9);
  });
});
