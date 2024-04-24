import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

function LoginForm() {
    return (
        <>
            <div style={{textAlign: 'center',  marginTop: '3rem'}}>
                <h4>Login</h4>
            </div>
            <form style={{width: '30rem', margin: 'auto', marginTop: '1rem'}}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"></input>
                </div>
                <button type="submit" className="btn btn-secondary">Login</button>
            </form>
            <div style={{textAlign: 'center',  marginTop: '2rem'}}>
                <span>Don't have a MeetMe account? </span><Link to={`${BASE_URL}/sign-up`}>Sign Up</Link>
            </div>
        </>

    );
}

export default LoginForm;