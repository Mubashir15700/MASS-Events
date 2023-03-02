import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLogin } from '../context/authProvider';
import Navbar from "../components/Navbar";
import AllEvents from "../screens/AllEvents";
import AddEvent from "../screens/AddEvent";
import EditEvent from "../screens/EditEvent";
import Booking from '../screens/Booking';
import Payment from '../screens/Payment';
import AllStaffs from "../screens/AllStaffs";
import AddStaff from "../screens/AddStaff";
import EditStaff from "../screens/EditStaff";
import Bookings from "../screens/Bookings";
import Payments from '../screens/Payments';
import Login from "../screens/Login";
import Register from "../screens/Register";


const Public = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

const Protected = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllEvents />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/allstaffs" element={<AllStaffs />} />
        <Route path="/editstaff/:id" element={<EditStaff />} />
        <Route path="/addstaff" element={<AddStaff />} />
      </Routes>
    </BrowserRouter>
  );
}

const CombinedScreens = () => {
  const { auth } = useLogin();
  return auth ? <Protected /> : <Public />;
}

export default CombinedScreens;