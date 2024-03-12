import { Link, useNavigate } from 'react-router-dom';
import '../login.css';
import { useLogin } from "../hooks/useLogin";
import { useField } from "../hooks/useField";

function Login() {
    const username = useField("username");
    const password = useField("password");

    const { login } = useLogin();

    const navigate = useNavigate();

    const handleLogin = async (event) => {
      event.preventDefault();
      const loginSuccess = await login(username.value, password.value);
      if (loginSuccess) {
          console.log('Login successful');
          navigate('/mainpage', { replace: true });
      }
    }

  return (
    <div className="containerj">
      <div className="brand-section">
        <img src="./images/blogbud_logo.png" alt="BlogBud Logo" className="logo" />
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
            <a href="#">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
