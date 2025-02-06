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
