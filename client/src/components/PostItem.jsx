import React from 'react';
import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  return (
    <div key={post._id}>
      <Link to={`/posts/${post.slug}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.excerpt}</p>
    </div>
  );
}