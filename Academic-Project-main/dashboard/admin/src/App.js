import './App.css';
import { BrowserRouter, Routes, Route, redirect, } from "react-router-dom";
import { useState, useEffect } from 'react';
import { checkAuth } from "./services/api.js";
import Navbar from "./components/Navbar";
import AllEvents from "./screens/AllEvents";
import AddEvent from "./screens/AddEvent";
import EditEvent from "./screens/EditEvent";
import AllStaffs from "./screens/AllStaffs";
import AddStaff from "./screens/AddStaff";
import EditStaff from "./screens/EditStaff";
import Bookings from "./screens/Bookings";
import Attendance from "./screens/Attendance";
import Payments from './screens/Payments';
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    checkUserAuth();
  }, [auth]);

  const checkUserAuth = async () => {
    let response = await checkAuth();
    if(response.data.status === "failed") {
      setAuth(false);
      redirect("/");
    }
  }

  return (
    <>
      {auth ?
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AllEvents />} />
            <Route path="/editevent/:id" element={<EditEvent />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/allstaffs" element={<AllStaffs />} />
            <Route path="/editstaff/:id" element={<EditStaff />} />
            <Route path="/addstaff" element={<AddStaff />} />
          </Routes>
        </BrowserRouter> 
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      }
    </>
  );
}

export default App;