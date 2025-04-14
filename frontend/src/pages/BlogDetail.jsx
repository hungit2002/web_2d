import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../services/blog.service';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!blog) return <div className="alert alert-warning mt-5">Blog not found</div>;

  return (
    <div className="container mt-5">
      <Link to="/customer/blogs" className="btn btn-outline-primary mb-4">
        ← Back to Blogs
      </Link>
      
      <article className="blog-post">
        <h1 className="mb-4">{blog.title}</h1>
        <div className="card">
          <div className="card-body">
            <p className="card-text">{blog.content}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail; 