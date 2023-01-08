import './App.css';
import Navbar from "./components/Navbar";
import AddStaff from "./components/AddStaff";
import AllStaffs from "./components/AllStaffs";
import AddEvent from "./components/AddEvent";
import AllEvents from "./components/AllEvents";
import EditStaff from "./components/EditStaff";
import EditEvent from "./components/EditEvent";
//import Login from "./components/Login";
//import Register from "./components/Register";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<AllEvents />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
        <Route path="/allstaffs" element={<AllStaffs />} />
        <Route path="/addstaff" element={<AddStaff />} />
        <Route path="/editstaff/:id" element={<EditStaff />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;