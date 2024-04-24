import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';

function Calendar() {
    const [view, setView] = useState("Week");

    return (
    <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {view}
        </button>
        <ul className="dropdown-menu">
            <li><Link to="" className="dropdown-item" onClick={() => setView("Month")}>Month</Link></li>
            <li><Link to="" className="dropdown-item" onClick={() => setView("Week")}>Week</Link></li>
            <li><Link to="" className="dropdown-item" onClick={() => setView("Day")}>Day</Link></li>
        </ul>
    </div>
    );
}

export default Calendar;