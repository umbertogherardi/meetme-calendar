import { useLoaderData } from 'react-router-dom';
import { WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';
import './MonthView.css'
import { useNavigate } from 'react-router-dom';

export async function loadMonthEvents(request) {
    /**
     * 
    const year = request.params.year;
    const month = request.params.month;
    const response = await fetch(`${BACKEND_URL}/calendar/month/${year}/${month}`);
     */
    return 1;
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
                        <div className="col border" style={{ height: (rowStartIdxs.length === 5) ? "15vh" : "12.5vh"}} key={`day-${dayVal}`}
                        id={dayVal} onClick={event => handleAddEvent(event)}>
                            {/** Day Number */}
                            <div className={(year === CURR_YEAR && month === CURR_MONTH && dayVal === CURR_DAY) ? "curr-day-month" : ""}>
                                {dayVal > 0 ? dayVal : ""}
                            </div>
                            {/** Events List */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    );
}

export default MonthView;