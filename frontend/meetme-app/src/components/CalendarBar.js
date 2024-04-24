import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FRONTEND_URL } from '../utils';

function CalendarBar(){
    
    const [view, setView] = useState("Month");
    const [viewName, setViewName] = useState("March 2024");

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
                <div className="container-fluid">
                    <span className="navbar-brand">{viewName}</span>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {view}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link to={`${FRONTEND_URL}/calendar/month`} className="dropdown-item" onClick={() => setView("Month")}>Month</Link></li>
                                    <li><Link to={`${FRONTEND_URL}/calendar/week`} className="dropdown-item" onClick={() => setView("Week")}>Week</Link></li>
                                    <li><Link to={`${FRONTEND_URL}/calendar/day`} className="dropdown-item" onClick={() => setView("Day")}>Day</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default CalendarBar;