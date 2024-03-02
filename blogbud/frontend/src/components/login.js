import { Link } from 'react-router-dom';
import '../login.css';

function Login() {
  return (
    <div className="containerj">
      <div className="brand-section">
        <img src="./images/coffee_logo.png" alt="BlogBud Logo" className="logo" />
        <h1>BlogBud</h1>
        <p>
          Here is going to be a description about our Personal Blog Platform. It
          is a platform where users can create their own blogs, write posts, and
          upload images. You can also read other people's posts.
        </p>
      </div>
      <div className="login-section">
        <form action="#" method="POST" className="login-form">
          <input
            type="text"
            placeholder="Username, email"
            name="username"
            required=""
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required=""
          />
          <Link to="/mainpage">
            <button type="submit">Login</button>
          </Link>
          <div className="form-footer">
            <p>Don’t have an account?</p>
            <Link to="/signup">Sign up</Link>
            <a href="#">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;