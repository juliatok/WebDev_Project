import React, { useState } from 'react';

const PostForm = ({ onPublish, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onPublish({ title, description, content });
    setTitle('');
    setDescription('');
    setContent('');
  };

  return (
    <div className='create-page'>
        <div className="create-wrapper">
            <h2>Create a Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <p>Enter a title for your blog:</p>
                <input className='title-form'
                    type="text"
                    placeholder="..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                </div>
                <button className='publish' type="submit">Publish</button>
                <button className='cancel' onClick={onCancel}>Cancel</button>
            </form>
        </div>
    </div>
  );
};

export default PostForm;


