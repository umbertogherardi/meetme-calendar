function LoginForm() {
    return (
        <>
            <div style={{textAlign: 'center',  marginTop: '3rem'}}>
                <h4>Login</h4>
            </div>
            <form style={{width: '30rem', margin: 'auto', marginTop: '1rem'}}>
                <div class="mb-3">
                    <label for="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput"></input>
                </div>
                <div class="mb-3">
                    <label for="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"></input>
                </div>
                <button type="submit" class="btn btn-dark">Login</button>
            </form>
            <div style={{textAlign: 'center',  marginTop: '2rem'}}>
                <span>Don't have a MeetMe account? <a href="#">Sign Up</a></span>
            </div>
        </>

    );
}

export default LoginForm;