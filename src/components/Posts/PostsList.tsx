import { useEffect, useState } from "react";

export type Post = { id: number; title: string };

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const data = async () => {
      const res = await fetch(`http://localhost:4000/posts`);
      const _data = await res.json();
      console.log(_data)
      setPosts(_data);
    };
    data();
  }, []);

  return (
    <div>
      <h1 data-testid='posts-title'>Posts List</h1>
      {posts?.map((post) => (
        <div key={post.id} data-testid="post-content">
          <h5>
            #{post.id} :{post.title}
          </h5>
        </div>
      ))}
    </div>
  );
}
