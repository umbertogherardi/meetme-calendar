import { useLoaderData } from 'react-router-dom';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';
import { WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import './DayView.css'

export async function loadDayEvents(request) {
    /**
     * 
    const year = request.params.year;
    const month = request.params.month;
    const response = await fetch(`${BACKEND_URL}/calendar/month/${year}/${month}`);
     */
    return 1;
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
    console.log(dayOfWeek);

    return (
        <>
        <CalendarBar year={year} month={month} day={day} viewType="Day"/>
        <div className="weekday-header single-header">
            {WEEKDAYS[currentMoment.day()]}
        </div>
        <div className="col border day">
            <div className={(year === CURR_YEAR && month === CURR_MONTH && day === CURR_DAY) ? "curr-day-single" : ""}>
                {day}
            </div>
        </div>
        </>
    );
}

export default DayView;