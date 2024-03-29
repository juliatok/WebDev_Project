import { Link, useNavigate } from 'react-router-dom';
import '../login.css';
import { useLogin } from "../hooks/useLogin";
import { useField } from "../hooks/useField";
import React, { useContext } from 'react';
import { BlogContext } from '../context/blogContext';
import { AuthContext } from '../context/authContext';

function Login() {
    const username = useField("username");
    const password = useField("password");

    const { login } = useLogin();

    const navigate = useNavigate();

    const { dispatch } = useContext(BlogContext);

    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogin = async (event) => {
      event.preventDefault();

      const loginSuccess = await login(username.value, password.value);
      if (loginSuccess) {
        setIsAuthenticated(true);
        console.log('Login successful');
        navigate('/mainpage', { replace: true });
        // Fetch user data after successful login
        const res = await fetch(`http://localhost:3001/api/users/myprofile`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in local storage
        dispatch({ type: 'CLEAR_BLOGS' });
        const blogRes = await fetch(`http://localhost:3001/api/blogs/user/${data.user._id}`);
        const blogData = await blogRes.json();
        if (blogRes.ok) {
          dispatch({ type: 'GET_BLOGS', payload: blogData.blogs }); // Update the blogs
        } else {
          console.log("Error fetching user's blogs");
        }
    } else {
        console.log("Error fetching user data");
    }
  }
}

  return (
    <div className="containerj">
      <div className="brand-section">
        <img src="./images/blogbud_logo.png" alt="BlogBud Logo" className="logo_front" />
        <h1>BlogBud</h1>
        <p>
        Welcome to BlogBud! 
        Unleash creativity through captivating blogs and journal entries. 
        Join us in shaping inspiring narratives.
        </p>
      </div>
      <div className="login-section">
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required=""
            {...username}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required=""
            {...password}
          />
          <button type="submit">Login</button>
          <div className="form-footer">
            <p>Don’t have an account?</p>
            <Link to="/signup">Sign up</Link>
            <a href="/">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
