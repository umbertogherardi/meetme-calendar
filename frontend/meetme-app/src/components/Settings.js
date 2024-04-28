import { useState } from 'react';

function Settings() {
    
    const [eventColor, setEventColor] = useState("#563d7c");
    const [dayColor, setDayColor] = useState("#563d7c");

    return (
        <div className="container-fluid">
            <label htmlFor="eventColor" className="form-label">Event Color</label>
            <input type="color" className="form-control form-control-color" id="eventColor" value={eventColor} onChange={event => console.log(event)}></input>   
            <label htmlFor="currentDayColor" className="form-label">Current Day Color</label>
            <input type="color" className="form-control form-control-color" id="currentDayColor" value={dayColor} onChange={event => console.log(event)}></input>  
        </div>
    );
}

export default Settings;