import { useState, useEffect } from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import { useNavigate, useParams } from "react-router-dom";
import '../App.css';
import { Link } from 'react-router-dom';



const BlogUpdateForm = ({onCancel}) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const { dispatch } = useBlogContext();
    const navigate = useNavigate();

    useEffect(() => {
       const fetchBlog = async () => {
            const res = await fetch('http://localhost:3001/api/blogs/' + id);
            const data = await res.json();

            if (res.ok) {
                console.log(data);
                setTitle(data.title);
                setAuthor(data.author);
                setBody(data.body);
                setDescription(data.description);
            }
            else {
                console.log("Error fetching blog");
            }
        }
        fetchBlog();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedBlog = { title, author, body, description };
            const res = await fetch(`http://localhost:3001/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBlog),
            });

            const json = await res.json();
         
            if (res.ok) {
                console.log(json);
                setTitle('');
                setAuthor('');
                setDescription('');
                setBody('');
                setError(null);
                dispatch({ type: 'UPDATE_BLOG', payload: json });
                navigate('/myprofile');
            }
            else {
                setError(json.error);
            }
    }
    return (
        <div className='create-page'>
            <div className="create-wrapper">
                <h2>Update a Blog</h2>
                <form onSubmit={handleUpdate}>
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
                    <button className='publish' type="submit" >Update</button>
                    <Link to='/myprofile'>
                        <button className='cancel' onClick={onCancel}>Cancel</button>
                    </Link>
                </form>
            </div>
        </div>
      );
    };




export default BlogUpdateForm;