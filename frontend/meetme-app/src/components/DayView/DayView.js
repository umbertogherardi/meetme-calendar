import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FRONTEND_URL, BACKEND_URL, WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';

import './DayView.css'

export async function loadDayEvents(request) {
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const response = await fetch(`${BACKEND_URL}/calendar/day/${year}/${month}/${day}`);
    return await response.json();
}

function DayView() {
    const dayEvents = useLoaderData();

    const DAY_SUBSTR = "day/";
    const url = window.location.href;
    
    const currentMoment = moment(url.slice(url.search(DAY_SUBSTR) + DAY_SUBSTR.length), "YYYY/MM/DD");
    const year = currentMoment.year();
    // add 1 since moment months are zero-indexed
    const month = currentMoment.month() + 1;
    const day = currentMoment.date();
    
    const dayOfWeek = currentMoment.day();

    const navigate = useNavigate();

    function handleAddEvent(event) {
        // Only add an event if we don't click on an event
        if (event.target.id !== '') {
            navigate(`/calendar/event-add/${year}/${month}/${event.target.id}`);
        }
    }

    return (
        <>
        <CalendarBar year={year} month={month} day={day} viewType="Day"/>
        <div className="weekday-header single-header">
            {WEEKDAYS[currentMoment.day()]}
        </div>
        <div className="col border day" id={day} onClick={event => handleAddEvent(event)}>
            <div className={(year === CURR_YEAR && month === CURR_MONTH && day === CURR_DAY) ? "curr-day bg-primary" : ""}>
                {day}
            </div>
            {/** Events List */}
            {dayEvents.map((dayEvent) => (
                <Link to={`${FRONTEND_URL}/calendar/event-update/${dayEvent._id}`} key={dayEvent._id} className="day-event">
                    <p>
                    {dayEvent.startTime < 1 ? 
                        `${(dayEvent.startTime + 12).toFixed(2).toString().replace(".", ":")}am - `
                        :
                        dayEvent.startTime >= 12 ?
                            `${(dayEvent.startTime - (dayEvent.startTime >= 13 ? 12 : 0)).toFixed(2).toString().replace(".", ":")}pm - `
                            :
                            `${(dayEvent.startTime).toFixed(2).toString().replace(".", ":")}am - `
                    }
                    {dayEvent.endTime < 1 ? 
                        `${(dayEvent.endTime + 12).toFixed(2).toString().replace(".", ":")}am`
                        :
                        dayEvent.endTime >= 12 ?
                            `${(dayEvent.endTime - (dayEvent.endTime >= 13 ? 12 : 0)).toFixed(2).toString().replace(".", ":")}pm`
                            :
                            `${(dayEvent.endTime).toFixed(2).toString().replace(".", ":")}am`
                    }
                    </p>
                    
                    <p>{dayEvent.eventName}</p>
                </Link>
            ))}
        </div>
        </>
    );
}

export default DayView;