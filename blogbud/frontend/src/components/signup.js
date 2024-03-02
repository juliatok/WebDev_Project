import { Link } from 'react-router-dom';
import '../signup.css';

function Signup() {
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
      <div className="signup-section">
        <form action="#" method="POST" className="signup-form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required=""
          />
            <input
                type="email"
                placeholder="Email"
                name="email"
                required=""
            />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required=""
          />
          <Link to="/mainpage">
            <button type="submit">Signup</button>
          </Link>
            <div className="form-footer">
                <Link to="/login">Return to Login</Link>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
