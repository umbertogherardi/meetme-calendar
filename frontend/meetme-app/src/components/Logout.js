import React from 'react';
import '../Logout.css'; 

function Logout() {
    // Function to handle logout
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = '/'; 
        }
    };

    return (
        <div className="logout-container">
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
