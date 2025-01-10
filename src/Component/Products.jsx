import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data); // Setting posts data to state
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures it runs only once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='posts-container'>
      <h1 className="posts-title">Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="posts-item">
            <h2 className="posts-title">{post.title}</h2>
            <p className="posts-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
