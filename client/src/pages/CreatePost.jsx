import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('tags', tags);
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }

    try {
      await postService.createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <form className = "w-full max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
      <h1 className="m-10 text-xl font-bold" >CREATE NEW POST</h1>
      <Input className="m-10"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea className="m-10"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Input className="m-10"
        type="file"
        accept="image/*"
        onChange={(e) => setFeaturedImage(e.target.files[0])}
      />
      <Input className="m-10"
        type="text"
        placeholder="Category ID"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Input className="m-10"
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button className="m-10" type="submit">Create Post</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}