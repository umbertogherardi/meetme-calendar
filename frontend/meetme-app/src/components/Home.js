import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../utils";

function Home() {
    return (
        <div style={{margin: '3rem'}}>
            <h3>Welcome to MeetMe</h3>
            <div style={{marginTop: '2rem', fontSize: 'large'}}>
                <p>Welcome to MeetMe, a platform for all your calendar-related needs!</p>
                <p>MeetMe gives you the traditional benefits of a calendar webapp, while also allowing you to view the calendars of people in your contacts list.</p>
                <p>If you're a returing user, please <Link to={`${FRONTEND_URL}/login`}>login</Link>. New users should <Link to={`${FRONTEND_URL}/sign-up`}>sign up</Link> for a new account.</p>
            </div>
        </div>
    );
}

export default Home;