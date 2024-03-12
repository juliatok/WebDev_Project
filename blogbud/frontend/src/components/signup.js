import { Link, useNavigate } from 'react-router-dom';
import '../signup.css';
import { useSignup } from "../hooks/useSignUp";
import { useField } from "../hooks/useField";

function Signup() {
    const username = useField("username");
    const email = useField("email");
    const password = useField("password");

    const { signup, error, isLoading } = useSignup();

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        const signupSuccess = await signup(username.value, email.value, password.value);
        if (signupSuccess) {
            console.log('Signup successful');
            navigate('/mainpage', { replace: true });
            const res = await fetch(`http://localhost:3001/api/users/myprofile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in local storage
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
      <div className="signup-section">
        <form action="#" method="POST" className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required=""
            {...username} 
          />
            <input
                type="email"
                placeholder="Email"
                name="email"
                required=""
                {...email} 
            />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required=""
            {...password} 
          />
            <button type="submit">Signup</button>
            <div className="form-footer">
                <Link to="/">Return to Login</Link>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
