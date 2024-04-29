import { Link } from 'react-router-dom';
import { FRONTEND_URL } from '../utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        // const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        // const confirmLogout = false
        // isLoggedIn ? (confirmLogout = window.confirm('Are you sure you want to logout?')) : confirmLogout = false;

        try {
            const response = await axios.post('http://localhost:3001/auth/login', { username, password });
            // Handle successful login (e.g., redirect user)
            console.log(response.data);
            sessionStorage.setItem('isLoggedIn', true);
            // alert('isLoggedIn: ' + sessionStorage.getItem('isLoggedIn'));
            
            alert("WORKS")
            // Redirect user to another page (e.g., home page)
            // STILL NEED TO REDIRECT TO THE CORRECT PAGE!!!
            navigate('/calendar/month'); // need to navigate to the corresponding page here... TODO
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <h4>Login</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <form style={{ width: '30rem', margin: 'auto', marginTop: '1rem' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-secondary">Login</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <span>Don't have a MeetMe account? </span><Link to={`${FRONTEND_URL}/sign-up`}>Sign Up</Link>
            </div>
        </>
    );
}

export default LoginForm;


