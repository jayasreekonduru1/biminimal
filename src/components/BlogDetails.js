
// src/components/BlogDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Blog.css';

const BlogDetails = () => {
  const { id } = useParams(); 
  console.log(id)// Make sure this matches the parameter in the route
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id.toString() === id) // Ensure id comparison is correct
  );
  console.log(blog)
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='blog-details m-5 d-flex flex-column align-items-center ' >
      <div className='d-flex flex-column align-items-center'>
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className='blog-details-image m-5' height="300px" width="600px"/>
      </div>
      
      
      <ul className='fs-5' style={{width: "700px"}}>
        {blog.description.map((paragraph, index) => (
          <li key={index}>{paragraph}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import './Blog.css';

// const BlogDetails = () => {
//   const { blogId } = useParams();
//   const blog = useSelector((state) =>
//     state.blogs.blogs.find((blog) => blog.id === Number(blogId))
//   );

//   if (!blog) {
//     return <div>Blog not found</div>;
//   }

//   return (
//     <div className='blog-details'>
//       <img src={blog.image} alt={blog.title} className='blog-details-image' />
//       <h2>{blog.title}</h2>
//       <ul>
//         {blog.description.map((paragraph, index) => (
//           <li key={index}>{paragraph}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BlogDetails;
