import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    user && dispatch(setUser(user.other));
  }, [])
  return (
    <div className="App">
      <div className="blue" style={{ top: "-18%", right: 0 }}></div>
      <div className="blue" style={{ top: '36%', left: '-8rem' }}></div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
