function SignUpForm() {
    return (
        <>
            <div style={{textAlign: 'center',  marginTop: '3rem'}}>
                <h4>Sign Up</h4>
            </div>
            <form style={{width: '30rem', margin: 'auto', marginTop: '1rem'}}>
                <div class="mb-3">
                    <label for="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput"></input>
                    <div id="emailHelp" class="form-text">Please enter a valid email.</div>
                </div>
                <div class="mb-3">
                    <label for="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"></input>
                </div>
                <button type="submit" class="btn btn-secondary">Sign Up</button>
            </form>
        </>

    );
}

export default SignUpForm;