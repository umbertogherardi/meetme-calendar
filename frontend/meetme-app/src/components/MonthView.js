import 'bootstrap/dist/js/bootstrap.bundle';
import { Link, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FRONTEND_URL, BACKEND_URL, MONTHS, WEEKDAYS } from '../utils';
import moment from 'moment';
import './MonthView.css'

let monthDec = 0;
let monthInc = 0;

export async function loadEventData(request) {
    const year = request.params.year;
    const month = request.params.month;
    const response = await fetch(`${BACKEND_URL}/calendar/year/${year}/month/${month}`);
    return await response.json();
}

function MonthView() {
    const [events, setEvents] = useState();
    const eventData = useLoaderData();

    useEffect(() => {
        setEvents(eventData);
    }, [eventData]);

    console.log(events);

    const [year, setYear] = useState(moment().year(2024));
    const [month, setMonth] = useState(moment().month());
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month').day());

    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startAM, setStartAM] = useState(true);
    const [endAM, setEndAM] = useState(true);

    const VIEW = "Month";

    const CURR_YEAR = moment().year();
    const CURR_MONTH = moment().month();
    const CURR_DAY = moment().date();

    const [eventDay, setEventDay] = useState(-1);

    // Create a new event
    async function addEvent(event) {
        event.preventDefault();

        const result = await fetch(`${BACKEND_URL}/calendar`, {
            method: "POST",
            body: JSON.stringify({
                year: year,
                month: month,
                day: eventDay,
                name: eventName,
                start: startTime + (startAM ? "AM" : "PM"),
                end: endTime + (endAM ? "AM" : "PM"),
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.status === 201) {
            console.log(await result.json());
        }
        else {
            console.log("error!");
        }

        resetEvent();
    }

    // Reset our state variables to clear the modal
    function resetEvent() {
        setEventName("");
        setStartTime("");
        setEndTime("");
        setStartAM(true);
        setEndAM(true);
    }

    // 
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

    function viewToday() {
        monthInc = 0;
        monthDec = 0;
        setYear(moment().year());
        setMonth(moment().month());
        setDaysInMonth(moment().daysInMonth());
        setFirstDayOfMonth(moment().startOf('month').day());
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
        if ((firstDayOfMonth + daysInMonth) > 35){
            while (dayNumberings.length < 42) {
                dayNumberings.push(-nIdx);
                nIdx++;
            }
        } else {
            while (dayNumberings.length < 35) {
                dayNumberings.push(-nIdx);
                nIdx++;
            }
        }
    
        return dayNumberings;
    }

    function setStartIdxs() {
        if ((firstDayOfMonth + daysInMonth) > 35) {
            return [0, 7, 14, 21, 28, 35];
        } else {
            return [0, 7, 14, 21, 28];
        }
    }

    let rowStartIdxs = setStartIdxs();
    let dayNumberings = setDayNumberings();

    return (
    <>
    {/** BEGIN NAVBAR **/}
    <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
        <div className="container-fluid">
            <span className="navbar-brand">{`${year}`}</span>
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

    {/** BEGIN CALENDAR **/}
    <div className="container text-center">
        {/** Weekday Names Row */}
        <div className="row" style={{margin: "2vh 0 2vh 0"}}>
            {WEEKDAYS.map((weekday) => (
                <div className="col" key={weekday}>
                    {weekday}
                </div>    
            ))}
        </div>

        {/** Calendar Day Cells */}
        {rowStartIdxs.map((index) => (
            <div className="row" key={index}>
                {dayNumberings.slice(index, index + 7).map((dayNumber) => (
                    dayNumber > 0 ?
                    <div className="col border" key={dayNumber} id={dayNumber} style={{ height: (rowStartIdxs.length === 5) ? "15vh" : "12.5vh"}} data-bs-toggle="modal" data-bs-target="#eventModal" onClick={event => setEventDay(parseInt(event.target.id))}>
                        <div className={((year === CURR_YEAR) && (month === CURR_MONTH) && (dayNumber === CURR_DAY)) ? "today-cell" : "cell"} >
                            {dayNumber}
                        </div>
                        {/** show only the two earliest events **/}
                        {eventData.slice(0,2).map((event) => (
                            event.day === dayNumber ? 
                            <div key={event.name} className="event-container">
                                {event.start} {event.name}
                            </div>
                            : 
                            <></>
                        ))}
                    </div>
                    :
                    <div className="col border">
                    </div>
                ))}
            </div>
        ))}
    </div>

    {/* BEGIN MODALS */}

    {/* Add Event Modal */}
    <div className="modal fade" id="eventModal" tabIndex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="eventModalLabel">{`${MONTHS[month]} ${eventDay}, ${year} Event`}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetEvent}></button>
            </div>
            <div className="modal-body">
                <form style={{margin: 'auto'}} onSubmit={addEvent}>
                    <div className="mb-3">
                        <label htmlFor="eventNameInput" className="form-label">Event Name</label>
                        <input 
                            className="form-control" id="eventNameInput" onChange={event => setEventName(event.target.value)}
                            value={eventName}>
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startTimeInput" className="form-label">Start Time</label>
                        <div style={{display: "flex", gap: "10px"}}>
                            <input 
                                className="form-control" id="startTimeInput" onChange={event => setStartTime(event.target.value)}
                                value={startTime}>    
                            </input>
                            <div className="btn-group" role="group" aria-label="Start time AM/PM toggle radio buton group">
                                <input type="radio" className="btn-check" name="btnradio-start" id="btnradio-am-start" autoComplete="off" defaultChecked onChange={() => setStartAM(true)}></input>
                                <label className="btn btn-outline-secondary" htmlFor="btnradio-am-start">AM</label>
                                <input type="radio" className="btn-check" name="btnradio-start" id="btnradio-pm-start" autoComplete="off" onChange={() => setStartAM(false)}></input>
                                <label className="btn btn-outline-secondary" htmlFor="btnradio-pm-start">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endTimeInput" className="form-label">End Time</label>
                        <div style={{display: "flex", gap: "10px"}}>
                            <input 
                                className="form-control" id="endTimeInput" onChange={event => setEndTime(event.target.value)}
                                value={endTime}>
                            </input>
                            <div className="btn-group" role="group" aria-label="End time AM/PM toggle radio buton group">
                                <input type="radio" className="btn-check" name="btnradio-end" id="btnradio-am-end" autoComplete="off" defaultChecked onChange={() => setEndAM(true)}></input>
                                <label className="btn btn-outline-secondary" htmlFor="btnradio-am-end">AM</label>
                                <input type="radio" className="btn-check" name="btnradio-end" id="btnradio-pm-end" autoComplete="off" onChange={() => setEndAM(false)}></input>
                                <label className="btn btn-outline-secondary" htmlFor="btnradio-pm-end">PM</label>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "left", gap: "10px"}}>
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={resetEvent}>Close</button>
                        <button type="button submit" className="btn btn-secondary" data-bs-dismiss="modal">Add Event</button>
                    </div>  
                </form>
            </div>
        </div>
    </div>

    {/* Edit & Remove Event Modal */}
    </div>
    </>
    );
}

export default MonthView;