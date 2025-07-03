import React, { useEffect, useState } from 'react';
import { postService } from '../services/api';
import PostItem from '../components/PostItem';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await postService.getAllPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}