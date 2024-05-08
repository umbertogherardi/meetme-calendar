import { Link, useNavigate } from 'react-router-dom';
import { FRONTEND_URL, CURR_DAY, CURR_MONTH, CURR_YEAR} from '../../utils';
import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/auth/login', { username, password });
            console.log(response.data);
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('username', username); // Store username in session storage
            navigate(`/calendar/${username}/month/${CURR_YEAR}/${CURR_MONTH}/${CURR_DAY}`); // Redirect to calendar page
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <span>Don't have a MeetMe account? </span><Link to={`${FRONTEND_URL}/sign-up`}>Sign Up</Link>
            </div>
        </>
    );
}

export default LoginForm;
