import { useState } from "react";
import { BACKEND_URL, MONTHS } from "../../utils";
import { useLoaderData, useNavigate } from "react-router-dom";
import './UpdateEventForm.css';

let username = '';

export async function loadEvent(request) {
    username = request.params.username;
    const response = await fetch(`${BACKEND_URL}/calendar/${username}/${request.params.eventId}`);
    return await response.json();
}

function UpdateEventForm() {
    const updatingEvent = useLoaderData();

    const [eventName, setEventName] = useState(updatingEvent.eventName);
    const [startTime, setStartTime] = useState(
        updatingEvent.startTime < 1 ? 
            `${(updatingEvent.startTime + 12).toFixed(2).toString().replace(".", ":")}`
            :
            updatingEvent.startTime >= 12 ?
                `${(updatingEvent.startTime - (updatingEvent.startTime >= 13 ? 12 : 0)).toFixed(2).toString().replace(".", ":")}`
                :
                `${(updatingEvent.startTime).toFixed(2).toString().replace(".", ":")}`
    );

    const [endTime, setEndTime] = useState(
        updatingEvent.endTime < 1 ? 
            `${(updatingEvent.endTime + 12).toFixed(2).toString().replace(".", ":")}`
            :
            updatingEvent.endTime >= 12 ?
                `${(updatingEvent.endTime - (updatingEvent.endTime >= 13 ? 12 : 0)).toFixed(2).toString().replace(".", ":")}`
                :
                `${(updatingEvent.endTime).toFixed(2).toString().replace(".", ":")}`
    );

    const [startAM, setStartAM] = useState(!(updatingEvent.startTime >= 12));
    const [endAM, setEndAM] = useState(!(updatingEvent.endTime >= 12));
    const [errorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();

    async function deleteEvent() {
        await fetch(`${BACKEND_URL}/calendar/${username}/${updatingEvent._id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        
        navigate(-1);
    }

    async function updateEvent(event) {
        event.preventDefault();
        setErrorMsg('');

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
            if ((startTimeNum >= 1) && (startTimeNum < 12)) {
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
            if ((endTimeNum >= 1) && (endTimeNum < 12)) {
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

        console.log(startTimeNum);
        console.log(endTimeNum);

        const eventData = {
            eventName: eventName,
            startTime: parseFloat(startTimeNum.toFixed(2)),
            endTime: parseFloat(endTimeNum.toFixed(2))
        }
        
        const result = await fetch(`${BACKEND_URL}/calendar/${sessionStorage.getItem('username')}/${updatingEvent._id}`, {
            method: "PATCH", 
            body: JSON.stringify(eventData),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        if (result.status === 200) {
            navigate(-1);
        } else {
            setErrorMsg(`Error updating event. Received ${result.status}`);
        }
    }

    return (
    <>
    <form className="update-form" onSubmit={updateEvent}>
        <h4>Event on {MONTHS[updatingEvent.month]} {updatingEvent.day}, {updatingEvent.year}</h4>
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
                    <input type="radio" className="btn-check" name="btnradio-start" id="btnradio-am-start" autoComplete="off" defaultChecked={updatingEvent.startTime < 12} onChange={() => setStartAM(true)}></input>
                    <label className="btn btn-outline-primary" htmlFor="btnradio-am-start">AM</label>
                    <input type="radio" className="btn-check" name="btnradio-start" id="btnradio-pm-start" autoComplete="off" defaultChecked={updatingEvent.startTime >= 12} onChange={() => setStartAM(false)}></input>
                    <label className="btn btn-outline-primary" htmlFor="btnradio-pm-start">PM</label>
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
                    <input type="radio" className="btn-check" name="btnradio-end" id="btnradio-am-end" autoComplete="off" defaultChecked={updatingEvent.endTime < 12} onChange={() => setEndAM(true)}></input>
                    <label className="btn btn-outline-primary" htmlFor="btnradio-am-end">AM</label>
                    <input type="radio" className="btn-check" name="btnradio-end" id="btnradio-pm-end" autoComplete="off" defaultChecked={updatingEvent.endTime >= 12} onChange={() => setEndAM(false)}></input>
                    <label className="btn btn-outline-primary" htmlFor="btnradio-pm-end">PM</label>
                </div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", justifyContent: "left", gap: "10px"}}>
                <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Close</button>
                <button type="button submit" className="btn btn-primary">Update Event</button>
            </div>
            <button type="button" className="btn btn-danger" onClick={deleteEvent}>Delete Event</button>
        </div>  
        
    </form>
    <div style={{display: errorMsg === "" ? "none" : "block"}} className="alert alert-danger error-msg">
        {errorMsg}
    </div>
    </>
    );
}

export default UpdateEventForm;