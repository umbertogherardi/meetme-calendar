import { useLoaderData } from 'react-router-dom';
import { WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';
import './WeekView.css'

export async function loadWeekEvents(request) {
    /**
     * 
    const year = request.params.year;
    const month = request.params.month;
    const response = await fetch(`${BACKEND_URL}/calendar/month/${year}/${month}`);
     */
    return 1;
}

function WeekView() {
    const weekEvents = useLoaderData();

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

    function setDayVals() {
        let dayVals = [];
        let firstDayOfWeek;
        let startInPrevMonth;
        
        if ((day - weekday) <= 0) {
            firstDayOfWeek = daysInPrevMonth - (day - weekday);
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
        <div className="container text-center">
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
                    <div className="col border weekday" key={dayVal}>
                        {/** Day Number */}
                        <div className={(year === CURR_YEAR && month === CURR_MONTH && dayVal === CURR_DAY) ? "curr-day-week" : ""}>
                            {dayVal}
                        </div>
                        {/** Events List */}
                    </div>
                ))}
            </div>
        </div>
        </>  
    );
}

export default WeekView;