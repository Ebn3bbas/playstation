import './App.css';
import Main from './Main/Main';
import Sidebar from './layout/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);
    // const getsession = () => sessionStorage.getItem('showSidebar');

    // const location = useLocation();
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.login);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);
    return (
        <div className='App'>
            {userInfo && <Sidebar showSidebar={showSidebar} />}
            <Main showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
    );
}

export default App;
