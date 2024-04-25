import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FRONTEND_URL, MONTH_ARR } from '../utils';
import moment from 'moment';

function WeekView() {

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());

    const VIEW = "Week";

    const CURR_YEAR = moment().year();
    const CURR_WEEK = moment().month();
    const CURR_DAY = moment().date();

    function decrementView() {
        
    }

    function incrementView() {
        
    }

    function viewToday() {
        
    }

    function setDayNumberings() {

    }

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
            <div className="container-fluid">
                <span className="navbar-brand">{`${MONTH_ARR[month]} ${year}`}</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="btn btn-light" type="button" onClick={viewToday}>
                            Today
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-light" type="button" onClick={decrementView}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                            </svg>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-light" type="button" onClick={incrementView}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>
                        </button>
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {VIEW}
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={`${FRONTEND_URL}/calendar/month`} className="dropdown-item">Month</Link></li>
                                <li><Link to={`${FRONTEND_URL}/calendar/week`} className="dropdown-item">Week</Link></li>
                                <li><Link to={`${FRONTEND_URL}/calendar/day`} className="dropdown-item">Day</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="container text-center">
            <div className="row" style={{margin: "2vh 0 2vh 0"}}>
                <div className="col">
                    Sunday
                </div>
                <div className="col">
                    Monday
                </div>
                <div className="col">
                    Tuesday
                </div>
                <div className="col">
                    Wednesday
                </div>
                <div className="col">
                    Thursday
                </div>
                <div className="col">
                    Friday
                </div>
                <div className="col">
                    Saturday
                </div>
            </div>
            <div className="row">
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
                <div className="col border" style={{height: "70vh"}}>
                    1
                </div>
            </div>
        </div>
    </>
    );
}

export default WeekView;