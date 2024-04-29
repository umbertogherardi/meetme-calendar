import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import MonthView from './components/MonthView';
import Contacts from './components/Contacts';
import Settings from './components/Settings';
import Home from './components/Home';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import Logout from './components/Logout';

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
        path: "/calendar",
        children: [
          {
            path: "month",
            element: <MonthView />
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
