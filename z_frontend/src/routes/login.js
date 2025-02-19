import React,{useState, useEffect, useRef, useImperativeHandle} from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Settings, UserCircle, ChevronDown, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../services/auth/useAuthHook';
import {authContext} from '../services/auth/useAuthHook';


const LoginPageMenu = React.forwardRef((props, ref) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchBarIsFocused, setSearchBarIsFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLoginPanel,setShowLoginPanel] = useState(false);
  const [username, setUsername] = useState("");
  const panelRef = useRef(null);
  const navigate = useNavigate();



  //Login Form handlers
  const handleLogin = () =>{
    console.log("Handled login button is clicked");
    // Redirecting to login page
    navigate('./auth/login');
  }

    useImperativeHandle(ref,()=>({
        setLogin,
    }))
;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  // console.log(userInfo);
  // console.log(userInfo.userType);
  // const authk = useAuth();
  // console.log(authk.permissions);

  // const {permissions} = authContext(permissions);
  // console.log(permissions);

  const setLogin = () =>{
    console.log("Setting the user to logged in ");
    setIsLoggedIn(true);
    setUsername(userInfo.username);
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.location.reload();
    window.location.href="/home";
  };
  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setShowLoginPanel(false); // Collapse the panel if clicked outside
    }
  };

  useEffect(() => {
    if (showLoginPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginPanel]);

  return (
    <div>
    {isLoggedIn ? (
      <div className="position-relative d-flex">
          <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="btn btn-link text-white text-decoration-none p-2 d-flex align-items-center gap-2 rounded transition-colors hover:bg-blue-700"
          >
              <UserCircle size={24} />
              <span className="text-truncate" style={{ maxWidth: '100px' }}>
                 {username}
              </span>
              <LogOut size={18} />
          </button>
          
          {showProfileMenu && (
              <div className="position-absolute end-0 mt-12 bg-white rounded shadow-lg py-1" 
                   style={{ width: '180px', zIndex: 1000 }}>
                  <a href="#" className="dropdown-item px-4 py-2 d-flex align-items-center transition-colors hover:bg-gray-100">
                      <User size={16} className="me-2" />
                      Profile
                  </a>
                  <a href="#" className="dropdown-item px-4 py-2 d-flex align-items-center transition-colors hover:bg-gray-100">
                      <Settings size={16} className="me-2" />
                      Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <button
                      onClick={handleLogout}
                      className="dropdown-item px-4 py-2 d-flex align-items-center text-danger transition-colors hover:bg-gray-100"
                  >
                      <LogOut size={16} className="me-2" />
                      Logout
                  </button>
              </div>
          )};
      </div>
    ) : (
      <div>
      <button  
          onClick={handleLogin}
          className="btn btn-link text-white text-decoration-none p-2 d-flex align-items-center gap-2 rounded transition-colors hover:bg-blue-700">
          <User size={24} />
          <span>Login</span>
      </button>
      {/* {showLoginPanel && (
        <div className="absolute top-14 right-0 bg-white shadow-lg rounded p-3 z-50">
          <h3 className="text-lg font-bold mb-2">Login</h3>
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control border-gray-300 rounded p-2 w-full"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border-gray-300 rounded p-2 w-full"
              placeholder="Enter password"
            />
          </div>
          <div className='d-flex'>
          <button className='w-1/2 mr-1 rounded-md bg-green-500 hover:bg-green-600 border-green-700 text-white'>
            SignUp
          </button>
          <button onClick={handleSubmit} className="btn btn-primary w-1/2">
            Login
          </button>
          </div>
          <a className='text-gray-700 text-sm' href='#'>Forgot your Password</a>
        </div>
      )} */}
      </div>
    )}
    </div>
  );
});

export default LoginPageMenu;