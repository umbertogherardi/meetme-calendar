import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FRONTEND_URL, MONTH_ARR } from '../utils';
import moment from "moment";

let monthDec = 0;
let monthInc = 0;

function MonthView() {
    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());
    const [day, setDay] = useState(moment().date());
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month').day());

    const [view, setView] = useState("Month");
    const CURR_MONTH = moment().month();

    function decrementView() {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
        monthDec -= monthInc;
        monthInc = 0;
        setDaysInMonth(moment().subtract(++monthDec, 'months').daysInMonth());
        setFirstDayOfMonth(moment().subtract(monthDec, 'months').startOf('month').day());
    }

    function incrementView() {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
        monthInc -= monthDec;
        monthDec = 0;
        setDaysInMonth(moment().add(++monthInc, 'months').daysInMonth());
        setFirstDayOfMonth(moment().add(monthInc, 'months').startOf('month').day());
    }

    function setDayNumberings() {
        let dayNumberings = [];
        let nIdx = 1;
    
        // buffer the beginning of our numberings
        for (nIdx = 1; nIdx <= firstDayOfMonth; nIdx++) {
            dayNumberings.push(-nIdx);
        }
        for (let pIdx = 1; pIdx <= daysInMonth; pIdx++) {
            dayNumberings.push(pIdx);
        }
        // pad the last of our numberings
        while(dayNumberings.length < 35) {
            dayNumberings.push(-nIdx);
            nIdx++;
        }
    
        return dayNumberings;
    }

    function addEvent(e){
        console.log(e.target);
    }

    const ROW_START_IDXS = [0, 7, 14, 21, 28];
    let dayNumberings = setDayNumberings();

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
            <div className="container-fluid">
                <span className="navbar-brand">{`${MONTH_ARR[month]} ${year}`}</span>
                <ul className="navbar-nav">
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
        <div className="container text-center">
            <div className="row" style={{margin: "1rem 0 1rem 0"}}>
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
            {ROW_START_IDXS.map((index) => (
                <div className="row" key={index}>
                    {dayNumberings.slice(index, index + 7).map((dayNumber) => (
                        ((dayNumber === day) && (CURR_MONTH === month)) ?
                        <div className="col border" key={dayNumber} id={dayNumber} style={{height: "6rem"}} onClick={addEvent}>
                            <div style={{color: "white", backgroundColor: "#2596BE", borderRadius: "16px", display: "flex", justifyContent: "center", width: "2rem", margin: "auto", padding: "4px"}}>
                                {dayNumber}
                            </div>
                        </div>
                        :
                        <div className="col border" key={dayNumber} id={dayNumber} style={{height: "6rem"}} onClick={addEvent}>
                            <div style={{padding: "4px"}}> 
                                {dayNumber > 0 ? dayNumber : ""}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </>
    );
}

export default MonthView;