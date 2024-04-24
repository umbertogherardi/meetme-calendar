import { FRONTEND_URL } from "../utils";
import { Link } from "react-router-dom";

function SignUpForm() {
    return (
        <>
            <div style={{textAlign: 'center',  marginTop: '3rem'}}>
                <h4>Sign Up</h4>
            </div>
            <form style={{width: '30rem', margin: 'auto', marginTop: '1rem'}}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput"></input>
                    <div id="emailHelp" className="form-text">Please enter a valid email address</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"></input>
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