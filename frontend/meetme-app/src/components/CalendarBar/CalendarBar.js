import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom';
import { MONTHS, FRONTEND_URL, CURR_YEAR, CURR_MONTH, CURR_DAY } from '../../utils';
import moment from 'moment';

function CalendarBar(props) {
    const year = props.year;
    const month = props.month;
    const day = props.day;
    const viewType = props.viewType;

    const daysInMonth = moment(`${year}/${month}/${day}`, "YYYY/MM/DD").daysInMonth();
    const daysInPrevMonth = (month === 1 ? 
                                moment(`${year - 1}/${12}`, "YYYY/MM").daysInMonth() : 
                                moment(`${year}/${month - 1}`, "YYYY/MM").daysInMonth()
                            );
                            
    const daysInNextMonth = (month === 12 ? 
                                moment(`${year + 1}/${1}`, "YYYY/MM").daysInMonth() : 
                                moment(`${year}/${month + 1}`, "YYYY/MM").daysInMonth()
                            );

    return (
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
            <div className="container-fluid">
                <span className="navbar-brand">{viewType === "Month" ? 
                                                    `${MONTHS[month]} ${year}` :
                                                    viewType === "Week" ?   
                                                        `${MONTHS[month]} ${year}` :
                                                        `${MONTHS[month]} ${day}, ${year}`
                                                }
                </span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to={`${FRONTEND_URL}/calendar/${viewType.toLowerCase()}/${CURR_YEAR}/${CURR_MONTH}/${CURR_DAY}`}>
                        <button className="btn btn-light" type="button">
                            Today
                        </button>
                    </Link>
                    </li>
                    {/** Backward Nav Button */}
                    <li className="nav-item">
                        {viewType === "Month" ?
                        <Link to={day > daysInPrevMonth ?
                                    month === 1 ? 
                                        `${FRONTEND_URL}/calendar/month/${year - 1}/${12}/${daysInPrevMonth}` : 
                                        `${FRONTEND_URL}/calendar/month/${year}/${month - 1}/${daysInPrevMonth}`
                                    :
                                    month === 1 ? 
                                        `${FRONTEND_URL}/calendar/month/${year - 1}/${12}/${day}` : 
                                        `${FRONTEND_URL}/calendar/month/${year}/${month - 1}/${day}`
                                }>
                            <button className="btn btn-light" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>
                            </button>
                        </Link>
                        :
                        viewType === "Week" ?
                        <Link to={day <= 7 ? 
                            month === 1 ?
                                `${FRONTEND_URL}/calendar/week/${year - 1}/${12}/${daysInPrevMonth - (7 - day)}` : 
                                `${FRONTEND_URL}/calendar/week/${year}/${month - 1}/${daysInPrevMonth - (7 - day)}` 
                            :
                            `${FRONTEND_URL}/calendar/week/${year}/${month}/${day - 7}`
                            }>
                            <button className="btn btn-light" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>
                            </button>
                        </Link>
                        :
                        <Link to={day === 1 ? 
                                    month === 1 ?
                                        `${FRONTEND_URL}/calendar/day/${year - 1}/${12}/${daysInPrevMonth}` : 
                                        `${FRONTEND_URL}/calendar/day/${year}/${month - 1}/${daysInPrevMonth}` 
                                    :
                                    `${FRONTEND_URL}/calendar/day/${year}/${month}/${day - 1}`
                                    }>
                            <button className="btn btn-light" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>
                            </button>
                        </Link>
                        }
                    </li>

                    {/** Forward Nav Button */}
                    <li className="nav-item">
                        {viewType === "Month" ?
                        <Link to={day > daysInNextMonth ?
                                    month === 12 ? 
                                        `${FRONTEND_URL}/calendar/month/${year + 1}/${1}/${daysInNextMonth}` : 
                                        `${FRONTEND_URL}/calendar/month/${year}/${month + 1}/${daysInNextMonth}`
                                    :
                                    month === 12 ?
                                        `${FRONTEND_URL}/calendar/month/${year + 1}/${1}/${day}` : 
                                        `${FRONTEND_URL}/calendar/month/${year}/${month + 1}/${day}`
                                }>
                            <button className="btn btn-light" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                </svg>
                            </button>
                        </Link>
                        :
                        viewType === "Week" ?
                        <Link to={day > (daysInMonth - 7) ?    
                                    month === 12 ?
                                        `${FRONTEND_URL}/calendar/week/${year + 1}/${1}/${day - (daysInMonth - 7)}` : 
                                        `${FRONTEND_URL}/calendar/week/${year}/${month + 1}/${day - (daysInMonth - 7)}` 
                                    :
                                    `${FRONTEND_URL}/calendar/week/${year}/${month}/${day + 7}`
                                    }>
                            <button className="btn btn-light" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                </svg>
                            </button>
                        </Link>
                        :
                        <Link to={day === daysInMonth ?
                                    month === 12 ? 
                                        `${FRONTEND_URL}/calendar/day/${year + 1}/${1}/${1}` : 
                                        `${FRONTEND_URL}/calendar/day/${year}/${month + 1}/${1}`
                                    :
                                    `${FRONTEND_URL}/calendar/day/${year}/${month}/${day + 1}`
                                }>
                            <button className="btn btn-light" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                </svg>
                            </button>
                        </Link>
                        }
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {viewType}
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={`${FRONTEND_URL}/calendar/month/${year}/${month}/${day}`} className="dropdown-item">Month</Link></li>
                                <li><Link to={`${FRONTEND_URL}/calendar/week/${year}/${month}/${day}`} className="dropdown-item">Week</Link></li>
                                <li><Link to={`${FRONTEND_URL}/calendar/day/${year}/${month}/${day}`} className="dropdown-item">Day</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default CalendarBar;