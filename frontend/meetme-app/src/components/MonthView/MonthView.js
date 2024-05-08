import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FRONTEND_URL, BACKEND_URL, WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';
import './MonthView.css';

let username = '';

export async function loadMonthEvents(request) {
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    username = request.params.username;
    const response = await fetch(`${BACKEND_URL}/calendar/${username}/month/${year}/${month}/${day}`);
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
        const eventDay = event.target.id;
        if (event.target.id > 0){
            if (username === sessionStorage.getItem('username')) {
                navigate(`/calendar/${username}/event-add/${year}/${month}/${eventDay}`);
            } else {
                alert(`You do not have permission to edit ${username}'s calendar.`);
            }
        } 
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
        <CalendarBar year={year} month={month} day={day} username={username} viewType="Month"/>
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
            {rowStartIdxs.map((rowIdx) => (
                <div className="row" key={`row-start-idx-${rowIdx}`}>
                    {dayVals.slice(rowIdx, rowIdx + 7).map((dayVal) => (
                        <div className="col border" style={{ minHeight: (rowStartIdxs.length === 5) ? "17vh" : "14.25vh"}} key={`day-${dayVal}`}
                        id={dayVal} onClick={event => handleAddEvent(event)}>
                            {/** Day Number */}
                            <div className={(year === CURR_YEAR && month === CURR_MONTH && dayVal === CURR_DAY) ? "curr-day-month bg-primary" : ""}>
                                {dayVal > 0 ? dayVal : ""}
                            </div>
                            {/** Events List */}
                            {monthEvents.filter((value) => value.day === dayVal).slice(0, rowStartIdxs.length === 5 ? 3 : 2).map((monthEvent) => (
                                <Link to={username === sessionStorage.getItem('username') ? `${FRONTEND_URL}/calendar/${username}/event-update/${monthEvent._id}` : null} key={monthEvent._id} className="month-event">
                                    {monthEvent.startTime < 1 ? 
                                        <p>{(monthEvent.startTime + 12).toFixed(2).toString().replace(".", ":")}am</p>
                                        :
                                        monthEvent.startTime >= 12 ?
                                            <p>{(monthEvent.startTime - (monthEvent.startTime >= 13 ? 12 : 0)).toFixed(2).toString().replace(".", ":")}pm</p>
                                            :
                                            <p>{(monthEvent.startTime).toFixed(2).toString().replace(".", ":")}am</p>
                                    }
                                    <p>{monthEvent.eventName}</p>
                                </Link>
                            ))}
                            {monthEvents.filter((value) => value.day === dayVal).length > (rowStartIdxs.length === 5 ? 3 : 2) ?
                                <Link to={`${FRONTEND_URL}/calendar/${username}/day/${year}/${month}/${dayVal}`} className="others">
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