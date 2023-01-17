import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./components/Navbar";
import AllEvents from "./components/AllEvents";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import AllStaffs from "./components/AllStaffs";
import AddStaff from "./components/AddStaff";
import EditStaff from "./components/EditStaff";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

  const [auth, setAuth] = useState(true);

  return (
    <>
      {
        auth ?
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<AllEvents />} />
              <Route path="/addevent" element={<AddEvent />} />
              <Route path="/editevent/:id" element={<EditEvent />} />
              <Route path="/allstaffs" element={<AllStaffs />} />
              <Route path="/addstaff" element={<AddStaff />} />
              <Route path="/editstaff/:id" element={<EditStaff />} />
            </Routes>
          </BrowserRouter> :
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