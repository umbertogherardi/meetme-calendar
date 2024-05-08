import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import MonthView, { loadMonthEvents } from './components/MonthView/MonthView';
import Contacts, { loadContacts } from './components/Contacts/Contacts';
import Settings from './components/Settings/Settings';
import WeekView, { loadWeekEvents } from './components/WeekView/WeekView';
import DayView, { loadDayEvents } from './components/DayView/DayView';
import Logout from './components/Logout/Logout';
import AddEventForm from './components/AddEventForm/AddEventForm';
import UpdateEventForm, { loadEvent } from './components/UpdateEventForm/UpdateEventForm';
import AddContactForm from './components/AddContactForm/AddContactForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginForm />
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/sign-up",
        element: <SignUpForm />
      },
      {
        path: "/calendar/:username",
        children: [
          {
            path: "month/:year/:month/:day",
            element: <MonthView />,
            loader: loadMonthEvents
          },
          {
            path: "week/:year/:month/:day",
            element: <WeekView />,
            loader: loadWeekEvents
          },
          {
            path: "day/:year/:month/:day",
            element: <DayView />,
            loader: loadDayEvents
          },
          {
            path: "event-add/:year/:month/:day",
            element: <AddEventForm />
          },
          {
            path: "event-update/:eventId",
            element: <UpdateEventForm />,
            loader: loadEvent
          },
        ]
      },
      {
        path: "/contacts",
        element: <Contacts />, 
        loader: loadContacts,
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/contacts-add",
        element: <AddContactForm />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
