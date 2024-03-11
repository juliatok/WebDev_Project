import { useState } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import { Link } from "react-router-dom";



const Blogdetails = ({ blog }) => {
  const { dispatch } = useBlogContext();
  const [isDeleted, setIsDeleted] = useState(false);
 

  const handleClick = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }
    const res = await fetch('http://localhost:3001/api/blogs/' + blog._id, {
      method: 'DELETE'
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({ type: 'DELETE_BLOG', payload: data });
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null; 
  }

  return (
    <div className="post">
      <Link to={`/blogs/${blog._id}/update`}>
        <h4 className="update" key={blog._id}>update</h4>
      </Link>
      <Link to={`/blogs/${blog._id}`}>
        <h4 key={blog._id}>{blog.title}</h4>
      </Link>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default Blogdetails;