import { NavLink } from 'react-router-dom';
import { FRONTEND_URL } from '../utils';
import moment from 'moment';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand">MeetMe</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={FRONTEND_URL} style={{ textDecoration: 'none'}} className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`${FRONTEND_URL}/login`} style={{ textDecoration: 'none'}} className="nav-link">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`${FRONTEND_URL}/calendar/year/${moment().year()}/month/${moment().month()}`} style={{ textDecoration: 'none'}} className="nav-link">Calendar</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`${FRONTEND_URL}/contacts`} style={{ textDecoration: 'none'}} className="nav-link">Contacts</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`${FRONTEND_URL}/settings`} style={{ textDecoration: 'none'}} className="nav-link">Settings</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;