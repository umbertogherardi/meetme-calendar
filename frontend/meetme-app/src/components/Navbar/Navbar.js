import { NavLink, useLocation } from 'react-router-dom';
import { FRONTEND_URL, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import { useState, useEffect } from 'react';

function Navbar() {
    const location = useLocation();
    const { pathname } = location;

    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const tabs = [
        { path: `/calendar/month/${CURR_YEAR}/${CURR_MONTH}/${CURR_DAY}`, label: 'Calendar' },
        { path: '/contacts', label: 'Contacts' },
        { path: '/settings', label: 'Settings' },
        // { path: '/', label: isLoggedIn ? 'Logout' : 'Login' }
        { path: '/logout', label: 'Logout'}
    ];

    // Dont think this function is necessary
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            sessionStorage.removeItem('isLoggedIn');
            window.location.reload();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand">MeetMe</span>
                <ul className="navbar-nav">
                    {/* Render tabs based on the current route */}
                    {tabs.map(tab => (
                        <li className="nav-item" key={tab.path}>
                            {/* Conditionally render tabs except on login page, home, or signup */}
                            {(pathname !== '/login' && pathname !== '/' && pathname !== '/sign-up') && (
                                <NavLink to={tab.path} style={{ textDecoration: 'none' }} className="nav-link">{tab.label}</NavLink>
                            )}
                            {/* Render the Login/Logout tab only on login page or home */}
                            {(pathname === '/login' || pathname === '/' || pathname === '/sign-up') && tab.path === '/login' && (
                                <NavLink to={tab.path} style={{ textDecoration: 'none' }} className="nav-link" onClick={isLoggedIn ? handleLogout : null}>{tab.label}</NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

