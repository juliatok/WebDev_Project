import { useState } from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({onCancel}) => {
    const { dispatch } = useBlogContext();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user:', user);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    

    const fetchBlogs = async () => {
        const res = await fetch('http://localhost:3001/api/blogs');
        const data = await res.json();
        dispatch({ type: 'GET_BLOGS', payload: data });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = { title, author, body, description, user_id: user._id };

        const res = await fetch('http://localhost:3001/api/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        });
        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
        }
        if (res.ok) {
            setTitle('');
            setAuthor('');
            setDescription('');
            setBody('');
            setError(null);
            dispatch({ type: 'ADD_BLOG', payload: json });
            fetchBlogs(); // Fetch all blogs again
            navigate('/myprofile');
        }
    }
 
    return (
        <div className='create-page'>
            <div className="create-wrapper">
                <h2>Create a Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                    <p>Enter a title for your blog:</p>
                    <textarea className='desc'
                        type="text"
                        placeholder="..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>
                    <p>Author:</p>
                    <textarea className='desc'
                        placeholder="..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} // Update description state
                    ></textarea>
                    <p>Enter a description for your blog:</p>
                    <textarea className='desc'
                        placeholder="..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update description state
                    ></textarea>
                    <div>
                    <p>Enter the content of your blog:</p>
                    <textarea className='text-area'
                        placeholder="..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    </div>
                    <button className='publish' type="submit">Publish</button>
                    <Link to="/myprofile">
                        <button className='cancel' onClick={onCancel}>Cancel</button>
                    </Link>
                </form>
            </div>
        </div>
      );
    };
export default BlogForm;
                    