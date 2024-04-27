import { FRONTEND_URL } from "../utils";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3001/auth/signup`, { username: email, password });
            // Redirect user to login page after successful signup
            console.log(response.data)
            alert("WORKS signup!")
            navigate('/') //still need to DETERMINE which page to navigate it back too TODO!!!
        } catch (error) {
            setError('Failed to sign up');
        }
    };


    return (
        <>
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <h4>Sign Up</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <form style={{width: '30rem', margin: 'auto', marginTop: '1rem'}} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div id="emailHelp" className="form-text">Please enter a valid email address</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-secondary">Sign Up</button>
            </form>
            <div style={{textAlign: 'center',  marginTop: '2rem'}}>
                <span>Already have a MeetMe account? </span><Link to={`${FRONTEND_URL}/login`}>Login</Link>
            </div>
        </>
    );
}

export default SignUpForm;