"use client";
import React, { useState, useEffect } from 'react';
import api from '../ultils/axiosConfig';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: '',
    content: '',
    author: ''
  });

  // Fetch all posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/blog/posts');
      setPosts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Could not fetch blog posts. CORS policy may be blocking requests. Please ensure the backend server has CORS enabled.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]: value
    });
  };

  // Function to submit new or edited post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing post
        await api.put(`/api/blog/posts/${currentPost.id}`, currentPost);
      } else {
        // Create new post
        await api.post('/api/blog/posts', currentPost);
      }
      
      // Reset form and refetch posts
      setCurrentPost({ id: null, title: '', content: '', author: '' });
      setIsEditing(false);
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post. CORS policy may be blocking requests.');
    }
  };

  // Function to edit a post
  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  // Function to delete a post
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/api/blog/posts/${id}`);
        fetchPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)'
    }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '3rem 1rem',
      }}>
        <h1 style={{ 
          fontSize: '2.25rem',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <span style={{ 
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundImage: 'linear-gradient(to right, #2563eb, #7c3aed)',
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))'
          }}>
            Blog Posts
          </span>
        </h1>
        
        {/* Error message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            borderLeftWidth: '4px',
            borderLeftColor: '#ef4444',
            color: '#b91c1c',
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
          }}>
            <p style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg style={{
                width: '1.25rem',
                height: '1.25rem',
                marginRight: '0.5rem',
                flexShrink: 0
              }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              {error}
            </p>
          </div>
        )}
        
        {/* Post form */}
        <div style={{
          marginBottom: '3rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          transition: 'all 0.3s',
          border: '1px solid rgba(229,231,235,0.5)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#1f2937',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '0.5rem'
          }}>
            {isEditing ? '✏️ Edit Post' : '✨ Create New Post'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={currentPost.title}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                placeholder="Enter post title"
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }} htmlFor="author">
                Author
              </label>
              <input
                id="author"
                type="text"
                name="author"
                value={currentPost.author}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                placeholder="Your name"
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }} htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={currentPost.content}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  minHeight: '10rem',
                  resize: 'vertical',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                placeholder="Write your blog post content here..."
                required
              />
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: '500',
                  outline: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  backgroundColor: isEditing ? '#f59e0b' : '#2563eb',
                  cursor: 'pointer',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = isEditing ? '#d97706' : '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = isEditing ? '#f59e0b' : '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                }}
              >
                {isEditing ? 'Update Post' : 'Create Post'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentPost({ id: null, title: '', content: '', author: '' });
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    color: '#4b5563',
                    fontWeight: '500',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#d1d5db';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Posts list */}
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '2rem',
            color: '#1f2937',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '0.5rem'
          }}>Published Posts</h2>
          
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2.5rem 0'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                border: '4px solid #e5e7eb',
                borderTopColor: '#2563eb',
                animation: 'spin 1s linear infinite'
              }}></div>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : posts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2.5rem 0',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              border: '1px solid rgba(229,231,235,0.5)'
            }}>
              <svg style={{
                margin: '0 auto',
                height: '3rem',
                width: '3rem',
                color: '#9ca3af'
              }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p style={{
                marginTop: '0.5rem',
                color: '#4b5563'
              }}>No posts found. Create your first post above!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.5rem',
            }}>
              <style>{`
                @media (min-width: 768px) {
                  .posts-grid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                }
                @media (min-width: 1024px) {
                  .posts-grid {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                  }
                }
                .post-card:hover .post-indicator {
                  transform: scaleX(1);
                }
              `}</style>
              {posts.map((post) => (
                <div key={post.id} className="post-card" style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(229,231,235,0.5)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                }}
                >
                  <div className="post-indicator" style={{
                    height: '0.75rem',
                    background: 'linear-gradient(to right, #3b82f6, #7c3aed)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease'
                  }}></div>
                  <div style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>{post.title}</h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <svg style={{
                        width: '1rem',
                        height: '1rem',
                        marginRight: '0.25rem',
                        flexShrink: 0
                      }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                      {post.author}
                    </p>
                    <p style={{
                      color: '#4b5563',
                      marginBottom: '1rem',
                      flexGrow: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical'
                    }}>{post.content}</p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <button
                        onClick={() => handleEdit(post)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#d97706',
                          transition: 'color 0.2s',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                        onMouseOver={e => { e.currentTarget.style.color = '#92400e' }}
                        onMouseOut={e => { e.currentTarget.style.color = '#d97706' }}
                      >
                        <svg style={{
                          width: '1rem',
                          height: '1rem',
                          marginRight: '0.25rem',
                          flexShrink: 0
                        }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-1.414.586H4V15a2 2 0 01-.586-1.414l10-10z"></path>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#dc2626',
                          transition: 'color 0.2s',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                        onMouseOver={e => { e.currentTarget.style.color = '#b91c1c' }}
                        onMouseOut={e => { e.currentTarget.style.color = '#dc2626' }}
                      >
                        <svg style={{
                          width: '1rem',
                          height: '1rem',
                          marginRight: '0.25rem',
                          flexShrink: 0
                        }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
