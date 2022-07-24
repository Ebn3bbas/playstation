import { FaRestroom, FaUserFriends, FaStore, FaSlidersH } from "react-icons/fa";

const ownerRoutes = [
  {
    name: "Settings",
    path: "/settings",
    icon: <FaSlidersH />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUserFriends />,
  },
  {
    name: "Devices",
    path: "/devices",
    icon: <FaUserFriends />,
  },
  {
    name: "Sessions",
    path: "/sessions",
    icon: <FaRestroom />,
  },
  {
    name: "Store",
    path: "/store",
    icon: <FaStore />,
  },
];

const userRoutes = [
  {
    name: "Sessions",
    path: "/sessions",
    icon: <FaRestroom />,
  },
];

export { ownerRoutes, userRoutes };
