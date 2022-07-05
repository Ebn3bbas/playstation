import Devices from '../pages/Devices/Devices';
import DevicesDetails from '../pages/Devices/DevicesDetails/DevicesDetails';
import DevicesForm from '../pages/Devices/DevicesForm/DevicesForm';
import Login from '../pages/Login/Login';
import ProductCategorys from '../pages/ProductCategorys/ProductCategorys';
import ProductCategorysDetails from '../pages/ProductCategorys/ProductCategorysDetails/ProductCategorysDetails';
import ProductCategorysForm from '../pages/ProductCategorys/ProductCategorysForm/ProductCategorysForm';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import Sessions from '../pages/Sessions/Sessions';
import SessionsDetails from '../pages/Sessions/SessionsDetails/SessionsDetails';
import SessionsForm from '../pages/Sessions/SessionsForm/SessionsForm';
import Settings from '../pages/Settings/Settings';
import SettingsForm from '../pages/Settings/SettingsForm/SettingsForm';
import Statistics from '../pages/Statistics/Statistics';
import Store from '../pages/Store/Store';
import StoreDetails from '../pages/Store/StoreDetails/StoreDetails';
import StoreForm from '../pages/Store/StoreForm/StoreForm';
import Users from '../pages/Users/Users';
import UsersDetails from '../pages/Users/UsersDetails/UsersDetails';
import UsersForm from '../pages/Users/UsersForm/UsersForm';

const routes = [
    {
        path: '/',
        element: <Statistics />,
    },
    {
        path: '/login',
        element: <Login isNew={null} />,
    },
    {
        path: '/register',
        element: <Register isNew={null} />,
    },
    {
        path: '/profile',
        element: <Profile isNew={null} />,
    },
    {
        path: '/users',
        element: <Users />,
    },
    {
        path: '/users-create-form',
        element: <UsersForm isNew={true} />,
    },
    {
        path: '/users-update-form/:id',
        element: <UsersForm isNew={false} />,
    },
    {
        path: '/users-details/:id',
        element: <UsersDetails />,
    },
    {
        path: '/devices',
        element: <Devices />,
    },
    {
        path: '/devices-create-form',
        element: <DevicesForm isNew={true} />,
    },
    {
        path: '/devices-update-form/:id',
        element: <DevicesForm isNew={false} />,
    },
    {
        path: '/devices-details/:id',
        element: <DevicesDetails />,
    },
    {
        path: '/product-categorys',
        element: <ProductCategorys />,
    },
    {
        path: '/product-categorys-create-form',
        element: <ProductCategorysForm isNew={true} />,
    },
    {
        path: '/product-categorys-update-form',
        element: <ProductCategorysForm isNew={false} />,
    },
    {
        path: '/product-categorys-details/:id',
        element: <ProductCategorysDetails />,
    },
    {
        path: '/sessions',
        element: <Sessions />,
    },
    {
        path: '/sessions-create-form',
        element: <SessionsForm isNew={true} />,
    },
    {
        path: '/sessions-update-form/:id',
        element: <SessionsForm isNew={false} />,
    },
    {
        path: '/sessions-details/:id',
        element: <SessionsDetails />,
    },
    {
        path: '/drinks',
        element: <Store />,
    },
    {
        path: '/drinks-create-form',
        element: <StoreForm isNew={true} />,
    },
    {
        path: '/drinks-update-form',
        element: <StoreForm isNew={false} />,
    },
    {
        path: '/drinks-details/:id',
        element: <StoreDetails />,
    },
    {
        path: '/settings',
        element: <Settings />,
    },
    {
        path: '/settings-create-form',
        element: <SettingsForm isNew={true} />,
    },
    {
        path: '/settings-update-form',
        element: <SettingsForm isNew={false} />,
    },
];

export default routes;
