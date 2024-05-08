import { useState } from "react";
import { BACKEND_URL } from "../../utils";
import { useNavigate } from "react-router-dom";
import './AddContactForm.css'

function AddContactForm() {
    const [contactUsername, setContactUsername] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const username = sessionStorage.getItem('username');

    let navigate = useNavigate();

    async function addContact(event) {
        event.preventDefault();
        setErrorMsg('');
        
        if (contactUsername === username) {
            setErrorMsg("Error. You cannot add yourself as a contact.");
            return;
        }

        const checkContactResult = await fetch(`${BACKEND_URL}/contacts/add/${contactUsername}`); 

        if (checkContactResult.status !== 200) {
            setErrorMsg(`Error adding contact. Received ${checkContactResult.status}.`);
            return;
        }

        const contacts = await (await fetch(`${BACKEND_URL}/contacts/${username}`)).json();

        for (let contact of contacts) {
            if (contact.contactUsername === contactUsername) {
                setErrorMsg(`Error adding contact. Contact ${contactUsername} has alread been added.`);
                return;
            }
        }

        if (checkContactResult.status !== 200) {
            setErrorMsg(`Error adding contact. Received ${checkContactResult.status}.`);
            return;
        }

        const contactData = {
            username: username,
            contactUsername: contactUsername
        }
        
        const addContactResult = await fetch(`${BACKEND_URL}/contacts`, {
            method: "POST", 
            body: JSON.stringify(contactData),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        
        if (addContactResult.status === 201) {
            navigate(-1);
        } else {
            setErrorMsg(`Error adding contact. Received ${addContactResult.status}`);
        }
    }

    return (
    <>
    <form className="contact-form" onSubmit={addContact}>
        <h4>Add Contact</h4>
        <div className="mb-3">
            <label htmlFor="contactNameInput" className="form-label">Contact Username</label>
            <input 
                className="form-control" id="contactNameInput" onChange={event => setContactUsername(event.target.value)}
                value={contactUsername}>
            </input>
        </div>
        <div style={{display: "flex", justifyContent: "left", gap: "10px"}}>
            <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Close</button>
            <button type="button submit" className="btn btn-primary">Add Contact</button>
        </div>  
    </form>
    <div style={{display: errorMsg === "" ? "none" : "block"}} className="alert alert-danger error-msg">
        {errorMsg}
    </div>
    </>
    );
}

export default AddContactForm;