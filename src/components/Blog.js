import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../features/blogs/blogsSlice';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <div className='blog-container'>
      <h2 className='knowledge'>Knowledge Lab</h2>
      <div className='blog-cards d-flex justify-content-center'>
        {blogs.map((blog) => (
          <div key={blog.id} className='blog-card'>
            <img src={blog.image} alt={blog.title} className='blog-image'/>
            <h3>{blog.title}</h3>
            <Link to={`/blogs/${blog.id}`} className='view-details'>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlogs } from '../features/blogs/blogsSlice';
// import { Link } from 'react-router-dom';
// import './Blog.css';

// const Blog = () => {
//   const dispatch = useDispatch();
//   const blogs = useSelector((state) => state.blogs.blogs);
//   console.log(blogs)
//   const status = useSelector((state) => state.blogs.status);
//   const error = useSelector((state) => state.blogs.error);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchBlogs());
//     }
//   }, [status, dispatch]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>{error}</div>;
//   }

//   if (!blogs || blogs.length === 0) {
//     return <div>No blogs available</div>;
//   }

//   return (
//     <div className='blog-container'>
//       <h2 className='knowledge'>Knowledge Lab</h2>
//       <div className='blog-cards'>
//       {blogs.map((blog) => (
//         <div key={blog.id} className='blog-card'>
//           <img src={blog.image} alt={blog.title} className='blog-image'/>
//           <h3>{blog.title}</h3>
//           <Link to={`/blogs/${blog.id}`} className='view-details'>View Details</Link>
//         </div>
//       ))}
//       </div>
//     </div>
//   );
// };

// export default Blog;
