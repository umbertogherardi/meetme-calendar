import { useState } from "react";
import moment from 'moment';
import { BACKEND_URL, MONTHS } from "../../utils";
import { useNavigate } from "react-router-dom";
import './AddEventForm.css';

function AddEventForm() {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startAM, setStartAM] = useState(true);
    const [endAM, setEndAM] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const MONTH_SUBSTR = "event-add/";
    const url = window.location.href;
    
    const currentMoment = moment(url.slice(url.search(MONTH_SUBSTR) + MONTH_SUBSTR.length), "YYYY/MM/DD");
    const year = currentMoment.year();
    // add 1 since moment months are zero-indexed
    const month = currentMoment.month() + 1;
    const day = currentMoment.date();

    let navigate = useNavigate();

    async function addEvent(event) {
        event.preventDefault();

        let startTimeNum = parseFloat(startTime.replace(':', '.'));
        if (startTimeNum > 12.59 || isNaN(startTimeNum)) {
            setErrorMsg(`Invalid 'Start Time' format. Please enter a valid numerical time and try again.`);
            return;
        }

        if (startAM === true) {
            if (startTimeNum >= 12) {
                startTimeNum -= 12;
            }
        }
        else {
            if (startTimeNum >= 1) {
                startTimeNum += 12;
            }
        }

        let endTimeNum = parseFloat(endTime.replace(':', '.'));
        if (endTimeNum > 12.59 || isNaN(endTimeNum)) {
            setErrorMsg(`Invalid 'End Time' format. Please enter a valid numerical time and try again.`);
            return;
        }

        if (endAM === true) {
            if (endTimeNum >= 12) {
                endTimeNum -= 12;
            }
        }
        else {
            if (endTimeNum <= 12) {
                endTimeNum += 12;
            }
        }

        if (startTimeNum >= endTimeNum) {
            setErrorMsg(`'Start Time' should be earlier than 'End Time'. Please fix these fields and try again.`);
            return;
        }

        if (eventName.length < 1) {
            setErrorMsg(`The 'Event Name' field cannot be left empty. Please fix this field and try again.`);
            return;
        }

        const eventData = {
            eventName: eventName,
            year: year,
            month: month,
            day: day,
            startTime: parseFloat(startTimeNum.toFixed(2)),
            endTime: parseFloat(endTimeNum.toFixed(2))
        }
        
        const result = await fetch(`${BACKEND_URL}/calendar`, {
            method: "POST", 
            body: JSON.stringify(eventData),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        if (result.status === 201) {
            navigate(-1);
        } else {
            setErrorMsg(`Error creating event. Received ${result.status}`);
        }
    }

    return (
    <>
    <form className="add-form" onSubmit={addEvent}>
        <h4>Event on {MONTHS[month]} {day}, {year}</h4>
        <div className="mb-3">
            <label htmlFor="eventNameInput" className="form-label">Event Name</label>
            <input 
                className="form-control" id="eventNameInput" onChange={event => setEventName(event.target.value)}
                value={eventName}>
            </input>
        </div>
        <div className="mb-3">
            <label htmlFor="startTimeInput" className="form-label">Start Time</label>
            <div style={{display: "flex", gap: "10px"}}>
                <input 
                    className="form-control" id="startTimeInput" onChange={event => setStartTime(event.target.value)}
                    value={startTime}>    
                </input>
                <div className="btn-group" role="group" aria-label="Start time AM/PM toggle radio buton group">
                    <input type="radio" className="btn-check" name="btnradio-start" id="btnradio-am-start" autoComplete="off" defaultChecked onChange={() => setStartAM(true)}></input>
                    <label className="btn btn-outline-secondary" htmlFor="btnradio-am-start">AM</label>
                    <input type="radio" className="btn-check" name="btnradio-start" id="btnradio-pm-start" autoComplete="off" onChange={() => setStartAM(false)}></input>
                    <label className="btn btn-outline-secondary" htmlFor="btnradio-pm-start">PM</label>
                </div>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="endTimeInput" className="form-label">End Time</label>
            <div style={{display: "flex", gap: "10px"}}>
                <input 
                    className="form-control" id="endTimeInput" onChange={event => setEndTime(event.target.value)}
                    value={endTime}>
                </input>
                <div className="btn-group" role="group" aria-label="End time AM/PM toggle radio buton group">
                    <input type="radio" className="btn-check" name="btnradio-end" id="btnradio-am-end" autoComplete="off" defaultChecked onChange={() => setEndAM(true)}></input>
                    <label className="btn btn-outline-secondary" htmlFor="btnradio-am-end">AM</label>
                    <input type="radio" className="btn-check" name="btnradio-end" id="btnradio-pm-end" autoComplete="off" onChange={() => setEndAM(false)}></input>
                    <label className="btn btn-outline-secondary" htmlFor="btnradio-pm-end">PM</label>
                </div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "left", gap: "10px"}}>
            <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Close</button>
            <button type="button submit" className="btn btn-secondary">Add Event</button>
        </div>  
    </form>
    <div style={{display: errorMsg === "" ? "none" : "block"}} className="alert alert-danger error-msg">
        {errorMsg}
    </div>
    </>
    );
}

export default AddEventForm;