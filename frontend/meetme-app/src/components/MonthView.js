import 'bootstrap/dist/js/bootstrap.bundle';
import { BACKEND_URL } from '../utils';
import { useLoaderData } from 'react-router-dom';

export async function loadMonthData() {
    const response = await fetch(`${BACKEND_URL}/calendar/month`);
    return await response.json();
}

function createDayNumberings(monthData) {
    let dayNumberings = [];
    let pIdx = 1;
    let nIdx = 1;

    // buffer our day numberings with so they fit nicely within our 35 day grid
    for (nIdx = 1; nIdx <= monthData.startOfMonth; nIdx++) {
        dayNumberings.push(-nIdx);
    }

    for (pIdx = 1; pIdx <= monthData.daysInMonth; pIdx++) {
        dayNumberings.push(pIdx);
    }

    while(dayNumberings.length < 35) {
        dayNumberings.push(-nIdx);
        nIdx++;
    }

    return dayNumberings;
}

function MonthView() {
    const monthData = useLoaderData();
    let dayNumberings = createDayNumberings(monthData);
    let rowStartIdxs = [0, 7, 14, 21, 28]
    console.log(monthData.startOfMonth);

    return (
    <div className="container text-center">
        <div className="row" style={{margin: "1rem 0 1rem 0"}}>
            <div className="col">
                Sunday
            </div>
            <div className="col">
                Monday
            </div>
            <div className="col">
                Tuesday
            </div>
            <div className="col">
                Wednesday
            </div>
            <div className="col">
                Thursday
            </div>
            <div className="col">
                Friday
            </div>
            <div className="col">
                Saturday
            </div>
        </div>
        {rowStartIdxs.map((index) => (
            <div className="row" key={index}>
                {dayNumberings.slice(index, index + 7).map((dayNumber) => (
                    dayNumber !== monthData.currentDay ?
                    <div className="col border" key={dayNumber} style={{height: "6rem"}}>
                        <div style={{padding: "4px"}}> 
                            {dayNumber > 0 ? dayNumber : ""}
                        </div>
                    </div>
                    :
                    <div className="col border" key={dayNumber} style={{height: "6rem"}}>
                        <div style={{color: "white", backgroundColor: "#2596BE", borderRadius: "16px", display: "flex", justifyContent: "center", width: "2rem", margin: "auto", padding: "4px"}}>
                            {dayNumber}
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
    );
}

export default MonthView;