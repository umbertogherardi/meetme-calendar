import { useLoaderData } from 'react-router-dom';
import { BACKEND_URL } from '../../utils';
import moment from 'moment';
import './MonthView.css'
import CalendarBar from '../CalendarBar/CalendarBar';

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
        <CalendarBar year={year} month={month} day={day} viewType="Month"/>
    );
}

export default MonthView;