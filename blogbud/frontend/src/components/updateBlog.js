import { useState, useEffect } from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import { useParams } from "react-router-dom";
import UserProfile from './userProfile';
import { Link } from 'react-router-dom';
import '../App.css';

const BlogUpdateForm = ({onPublish, onCancel}) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');

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

    return (
        <div className='create-page'>
            <div className="create-wrapper">
                <h2>Update a Blog</h2>
                <form>
                    <div>
                    <p>Enter a title for your blog:</p>
                    <input className='title-form'
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
                    <button className='publish' type="submit" onClick={async () => {
                        await onPublish();
                    
                    }}>Publish</button>
                    <button className='cancel' onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
      );
}

export default BlogUpdateForm