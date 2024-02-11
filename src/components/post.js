import React from 'react';
import { Link } from 'react-router-dom';
import ReadingPage from './readingpage';

const Post = ({ post }) => {
    return (
        <div className='postlink'>
            <Link to="/readingpage">{ReadingPage}
                <h2>{post.title}</h2>
            </Link>
        </div>
    );
};

export default Post;
