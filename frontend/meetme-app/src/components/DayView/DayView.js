import { useLoaderData, useNavigate } from 'react-router-dom';
import { BACKEND_URL, WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
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
        navigate(`/calendar/event-add/${year}/${month}/${event.target.id}`);
    }

    return (
        <>
        <CalendarBar year={year} month={month} day={day} viewType="Day"/>
        <div className="weekday-header single-header">
            {WEEKDAYS[currentMoment.day()]}
        </div>
        <div className="col border day" id={day} onClick={event => handleAddEvent(event)}>
            <div className={(year === CURR_YEAR && month === CURR_MONTH && day === CURR_DAY) ? "curr-day" : ""}>
                {day}
            </div>
            {/** Events List */}
            {dayEvents.map((dayEvent) => (
                <div key={`${dayEvent.day}-${dayEvent.eventName}`} className="day-event">
                    <div>
                    </div>
                    {dayEvent.startTime < 1 ? 
                        <p>{(dayEvent.startTime + 12).toString().replace(".", ":")}am</p>
                        :
                        dayEvent.startTime >= 13 ?
                            <p>{(dayEvent.startTime - 12).toString().replace(".", ":")}pm</p>
                            :
                            <p>{(dayEvent.startTime).toString().replace(".", ":")}am</p>
                    }
                    -
                    {dayEvent.endTime < 1 ? 
                        <p>{(dayEvent.endTime + 12).toString().replace(".", ":")}am</p>
                        :
                        dayEvent.endTime >= 13 ?
                            <p>{(dayEvent.endTime - 12).toString().replace(".", ":")}pm</p>
                            :
                            <p>{(dayEvent.endTime).toString().replace(".", ":")}am</p>
                    }
                    <p>{dayEvent.eventName}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default DayView;