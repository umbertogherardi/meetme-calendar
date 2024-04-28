import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import MonthView, { loadEventData } from './components/MonthView';
import Contacts from './components/Contacts';
import Settings from './components/Settings';
import Home from './components/Home';
import WeekView from './components/WeekView';
import DayView from './components/DayView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/sign-up",
        element: <SignUpForm />
      },
      {
        path: "/calendar/year/:year",
        children: [
          {
            path: "month/:month",
            element: <MonthView />,
            loader: loadEventData
          },
          {
            path: "week",
            element: <WeekView />
          },
          {
            path: "day",
            element: <DayView />
          }
        ]
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: "/settings",
        element: <Settings />
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
