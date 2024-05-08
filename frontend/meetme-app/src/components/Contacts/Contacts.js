import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";

export async function loadContacts() {
    const username = sessionStorage.getItem('username');
    const response = await fetch(`${BACKEND_URL}/contacts/${username}`);
    return await response.json();
}

function Contacts() {
    const contactsList = useLoaderData();

    const navigate = useNavigate();

    function handleAddContact() {
        navigate('/contacts-add');
    }

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
            <div className="container-fluid">
                <span className="navbar-brand">Contacts</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="btn btn-light" type="button" onClick={handleAddContact}>
                            Add Contact
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <div style={{display: "flex", flexWrap: "wrap", margin: "2rem 6.5rem", gap: "1rem"}}>
            {contactsList.map((contact, index) => (
            <div className="card" style={{width: "18rem"}} key={contact.contactUsername}>
                <div className="card-body">
                    <h5 className="card-title">Contact {index + 1}</h5>
                    <p className="card-text">{contact.contactUsername}</p>
                    <Link to="#" className="btn btn-primary">View Calendar</Link>
                </div>
            </div>
            ))}
        </div>
    </>
    );
}

export default Contacts;