import {
    FaRestroom,
    FaUserFriends,
    FaChartLine,
    FaStore,
    FaSlidersH,
    FaClipboardList,
    FaCubes,
} from 'react-icons/fa';

const links = [
    {
        name: 'Overview',
        path: '/',
        icon: <FaChartLine />,
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: <FaSlidersH />,
    },
    {
        name: 'Users',
        path: '/users',
        icon: <FaUserFriends />,
    },
    {
        name: 'Devices',
        path: '/devices',
        icon: <FaUserFriends />,
    },
    {
        name: 'Sessions',
        path: '/sessions',
        icon: <FaRestroom />,
    },
    {
        name: 'Drinks',
        path: '/drinks',
        icon: <FaStore />,
    },
];

export default links;
