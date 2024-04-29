import { useLoaderData } from 'react-router-dom';
import CalendarBar from '../CalendarBar/CalendarBar';
import moment from 'moment';

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
    
    const daysInMonth = currentMoment.daysInMonth();
    const firstDayOfMonth = currentMoment.startOf('month').day();

    return (
        <CalendarBar year={year} month={month} day={day} viewType="Day"/>
    );
}

export default DayView;