import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FRONTEND_URL, BACKEND_URL, WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';
import './WeekView.css'

export async function loadWeekEvents(request) {
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const response = await fetch(`${BACKEND_URL}/calendar/week/${year}/${month}/${day}`);
    return await response.json();
}

function WeekView() {
    const weekEvents = useLoaderData();
    console.log(weekEvents);

    const WEEK_SUBSTR = "week/";
    const url = window.location.href;
    
    const currentMoment = moment(url.slice(url.search(WEEK_SUBSTR) + WEEK_SUBSTR.length), "YYYY/MM/DD");
    const year = currentMoment.year();
    // add 1 since moment months are zero-indexed
    const month = currentMoment.month() + 1;
    const day = currentMoment.date();
    const weekday = currentMoment.weekday();
    
    const daysInMonth = currentMoment.daysInMonth();
    const firstDayOfMonth = currentMoment.startOf('month').day();

    const daysInPrevMonth = (month === 1 ? 
        moment(`${year - 1}/${12}/${day}`, "YYYY/MM/DD").daysInMonth() : 
        moment(`${year}/${month - 1}/${day}`, "YYYY/MM/DD").daysInMonth()
    );

    const daysInNextMonth = (month === 12 ? 
            moment(`${year + 1}/${1}/${day}`, "YYYY/MM/DD").daysInMonth() : 
            moment(`${year}/${month + 1}/${day}`, "YYYY/MM/DD").daysInMonth()
    );

    const navigate = useNavigate();

    function handleAddEvent(event) {
        const eventDay = event.target.id;
        
        // Only add an event if we don't click on an event
        if (event.target.id !== '') {
            // case where we add to the previous month
            if (eventDay > (day + (6 - weekday))) {
                navigate(`/calendar/event-add/${year}/${month - 1}/${eventDay}`);
            }
            // case where we add to the next month
            else if (eventDay < (day - weekday)) {
                navigate(`/calendar/event-add/${year}/${month + 1}/${eventDay}`);
            }
            // case where we add to the current month
            else navigate(`/calendar/event-add/${year}/${month}/${eventDay}`);
        }
    }

    function setDayVals() {
        let dayVals = [];
        let firstDayOfWeek;
        let startInPrevMonth;
        if ((day - weekday) <= 0) {
            firstDayOfWeek = daysInPrevMonth + (day - weekday);
            startInPrevMonth = true;
        } else {
            firstDayOfWeek = day - weekday;
            startInPrevMonth = false;
        }    
        
        let dayOfWeek = firstDayOfWeek;
        for (let dayIdx = 1; dayIdx <= 7; dayIdx++) {
            dayVals.push(dayOfWeek);
            
            if (startInPrevMonth) {
                if (dayOfWeek === daysInPrevMonth) {
                    dayOfWeek = 0;
                    startInPrevMonth = false;
                }
            } else {
                if (dayOfWeek === daysInMonth) {
                    dayOfWeek = 0;
                }
            }
            dayOfWeek ++;
        }
        return dayVals;
    }

    let dayVals = setDayVals();

    return (
        <>
        <CalendarBar year={year} month={month} day={day} viewType="Week"/>
        <div className="container text-center" style={{marginBottom: "12px"}}>
            {/** Weekday Headers */}
            <div className="row weekday-header">
            {WEEKDAYS.map((weekday) => (
                <div className="col-sm" key={weekday}>
                    {weekday}
                </div>
            ))}
            </div>

            {/** Day Cells */}
            <div className="row">
                {dayVals.map((dayVal) => (
                    <div className="col border weekday" key={dayVal} id={dayVal} onClick={event => handleAddEvent(event)}>
                        {/** Day Number */}
                        <div className={(year === CURR_YEAR && month === CURR_MONTH && dayVal === CURR_DAY) ? "curr-day-week bg-primary" : ""}>
                            {dayVal}
                        </div>
                        {/** Events List */}
                        {weekEvents.filter((value) => value.day === dayVal).map((weekEvent) => (
                                <Link to={`${FRONTEND_URL}/calendar/event-update/${weekEvent._id}`} key={weekEvent._id} className="week-event">
                                    {weekEvent.startTime < 1 ? 
                                        <p>{(weekEvent.startTime + 12).toFixed(2).toString().replace(".", ":")}am</p>
                                        :
                                        weekEvent.startTime >= 13 ?
                                            <p>{(weekEvent.startTime - 12).toFixed(2).toString().replace(".", ":")}pm</p>
                                            :
                                            <p>{(weekEvent.startTime).toFixed(2).toString().replace(".", ":")}am</p>
                                    }
                                    <p>{weekEvent.eventName}</p>
                                </Link>
                            ))}
                    </div>
                ))}
            </div>
        </div>
        </>  
    );
}

export default WeekView;