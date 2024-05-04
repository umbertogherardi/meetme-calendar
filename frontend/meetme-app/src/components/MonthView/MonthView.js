import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FRONTEND_URL, BACKEND_URL, WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';
import './MonthView.css';

export async function loadMonthEvents(request) {
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const response = await fetch(`${BACKEND_URL}/calendar/month/${year}/${month}/${day}`);
    return await response.json();
}

function MonthView() {
    const monthEvents = useLoaderData();

    const MONTH_SUBSTR = "month/";
    const url = window.location.href;
    
    const currentMoment = moment(url.slice(url.search(MONTH_SUBSTR) + MONTH_SUBSTR.length), "YYYY/MM/DD");
    const year = currentMoment.year();
    // add 1 since moment months are zero-indexed
    const month = currentMoment.month() + 1;
    const day = currentMoment.date();
    
    const daysInMonth = currentMoment.daysInMonth();
    const firstDayOfMonth = currentMoment.startOf('month').day();

    const navigate = useNavigate();

    function handleAddEvent(event) {
        const eventDay = event.target.id
        if (event.target.id > 0) navigate(`/calendar/event-add/${year}/${month}/${eventDay}`);
    }

    function setDayVals() {
        let dayVals = [];
        let bufferIdx = 1;
        
        for (bufferIdx = 1; bufferIdx <= firstDayOfMonth; bufferIdx++) {
            dayVals.push(-bufferIdx);
        }

        for (let dayIdx = 1; dayIdx <= daysInMonth; dayIdx++) {
            dayVals.push(dayIdx);
        }

        if ((firstDayOfMonth + daysInMonth) > 35){
            while (dayVals.length < 42) {
                dayVals.push(-bufferIdx);
                bufferIdx++;
            }
        } else {
            while (dayVals.length < 35) {
                dayVals.push(-bufferIdx);
                bufferIdx++;
            }
        }
        return dayVals;
    }

    function setRowStartIdxs() {
        if ((firstDayOfMonth + daysInMonth) > 35) {
            return [0, 7, 14, 21, 28, 35];
        } else {
            return [0, 7, 14, 21, 28];
        }
    }

    let rowStartIdxs = setRowStartIdxs();
    let dayVals = setDayVals();

    return (
        <>
        <CalendarBar year={year} month={month} day={day} viewType="Month"/>
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
            {rowStartIdxs.map((rowIdx) => (
                <div className="row" key={`row-start-idx-${rowIdx}`}>
                    {dayVals.slice(rowIdx, rowIdx + 7).map((dayVal) => (
                        <div className="col border" style={{ minHeight: (rowStartIdxs.length === 5) ? "17vh" : "14.25vh"}} key={`day-${dayVal}`}
                        id={dayVal} onClick={event => handleAddEvent(event)}>
                            {/** Day Number */}
                            <div className={(year === CURR_YEAR && month === CURR_MONTH && dayVal === CURR_DAY) ? "curr-day-month" : ""}>
                                {dayVal > 0 ? dayVal : ""}
                            </div>
                            {/** Events List */}
                            {monthEvents.filter((value) => value.day === dayVal).slice(0, rowStartIdxs.length === 5 ? 3 : 2).map((monthEvent, idx) => (
                                <div key={`${monthEvent.day}-${monthEvent.eventName}-${idx}`} className="month-event">
                                    {monthEvent.startTime < 1 ? 
                                        <p>{(monthEvent.startTime + 12).toString().replace(".", ":")}am</p>
                                        :
                                        monthEvent.startTime >= 13 ?
                                            <p>{(monthEvent.startTime - 12).toString().replace(".", ":")}pm</p>
                                            :
                                            <p>{(monthEvent.startTime).toString().replace(".", ":")}am</p>
                                    }
                                    <p>{monthEvent.eventName}</p>
                                </div>
                            ))}
                            {monthEvents.filter((value) => value.day === dayVal).length > (rowStartIdxs.length === 5 ? 3 : 2) ?
                                <Link to={`${FRONTEND_URL}/calendar/day/${year}/${month}/${dayVal}`} className="others">
                                {monthEvents.filter((value) => value.day === dayVal).length - (rowStartIdxs.length === 5 ? 3 : 2)} other(s)
                                </Link>
                                :
                                null
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    );
}

export default MonthView;