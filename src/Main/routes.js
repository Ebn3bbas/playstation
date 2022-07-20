import Devices from "../pages/Devices/Devices";
import DevicesForm from "../pages/Devices/DevicesForm/DevicesForm";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Sessions from "../pages/Sessions/Sessions";
import SessionsDetails from "../pages/Sessions/SessionsDetails/SessionsDetails";
import SessionsForm from "../pages/Sessions/SessionsForm/SessionsForm";
import Settings from "../pages/Settings/Settings";
import Store from "../pages/Store/Store";
import StoreDetails from "../pages/Store/StoreDetails/StoreDetails";
import StoreForm from "../pages/Store/StoreForm/StoreForm";
import Users from "../pages/Users/Users";
import UsersDetails from "../pages/Users/UsersDetails/UsersDetails";
import UsersForm from "../pages/Users/UsersForm/UsersForm";

const routes = [
  {
    path: "/",
    element: <Sessions />,
  },
  {
    path: "/login",
    element: <Login isNew={null} />,
  },
  {
    path: "/register",
    element: <Register isNew={null} />,
  },
  {
    path: "/profile",
    element: <Profile isNew={null} />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users-create-form",
    element: <UsersForm isNew={true} />,
  },
  {
    path: "/users-update-form/:id",
    element: <UsersForm isNew={false} />,
  },
  {
    path: "/users-details/:id",
    element: <UsersDetails />,
  },
  {
    path: "/devices",
    element: <Devices />,
  },
  {
    path: "/devices-create-form",
    element: <DevicesForm isNew={true} />,
  },
  {
    path: "/devices-update-form/:id",
    element: <DevicesForm isNew={false} />,
  },

  {
    path: "/sessions",
    element: <Sessions />,
  },
  {
    path: "/sessions-create-form",
    element: <SessionsForm isNew={true} />,
  },
  {
    path: "/sessions-update-form/:id",
    element: <SessionsForm isNew={false} />,
  },
  {
    path: "/sessions-details/:id",
    element: <SessionsDetails />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/store-create-form",
    element: <StoreForm isNew={true} />,
  },
  {
    path: "/store-update-form",
    element: <StoreForm isNew={false} />,
  },
  {
    path: "/store-details/:id",
    element: <StoreDetails />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
];

export default routes;
