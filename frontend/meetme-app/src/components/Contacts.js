import { Link } from "react-router-dom";

function Contacts() {

    function addContact() {
        console.log("Contact added!");
    }

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-body" data-bs-theme="light" style={{padding: "1rem 6rem"}}>
            <div className="container-fluid">
                <span className="navbar-brand">Contacts</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="btn btn-light" type="button" onClick={addContact}>
                            Add Contact
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <div style={{display: "flex", flexWrap: "wrap", margin: "2rem 6.5rem", gap: "1rem"}}>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 1</h5>
                    <p className="card-text">contact1@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 2</h5>
                    <p className="card-text">contact2@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 3</h5>
                    <p className="card-text">contact3@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 4</h5>
                    <p className="card-text">contact4@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 5</h5>
                    <p className="card-text">contact5@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 6</h5>
                    <p className="card-text">contact6@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Contact 7</h5>
                    <p className="card-text">contact7@gmail.com</p>
                    <Link to="#" className="btn btn-secondary">View Calendar</Link>
                </div>
            </div>
        </div>
    </>
    );
}

export default Contacts;