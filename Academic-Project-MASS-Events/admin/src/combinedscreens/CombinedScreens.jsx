import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLogin } from '../context/authProvider';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Navbar from "../components/Navbar";
import AllEvents from "../screens/AllEvents";
import EditEvent from "../screens/EditEvent";
import Bookings from '../screens/Bookings';
import Payments from '../screens/Payments';
import AddEvent from "../screens/AddEvent";
import EventsStatus from "../screens/EventsStatus";
import PrevPayments from '../screens/PrevPayments';
import AllStaffs from "../screens/AllStaffs";
import EditStaff from "../screens/EditStaff";
import AddStaff from "../screens/AddStaff";

const Protected = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllEvents />} />
        <Route path="/edit_event/:id" element={<EditEvent />} />
        <Route path="/bookings/:id" element={<Bookings />} />
        <Route path="/payments/:id" element={<Payments />} />
        <Route path="/add_event" element={<AddEvent />} />
        <Route path="/events_status" element={<EventsStatus />} />
        <Route path="/prev_payments" element={<PrevPayments />} />
        <Route path="/all_staffs" element={<AllStaffs />} />
        <Route path="/edit_staff/:id" element={<EditStaff />} />
        <Route path="/add_staff" element={<AddStaff />} />
      </Routes>
    </BrowserRouter>
  );
}

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

const CombinedScreens = () => {
  const { auth } = useLogin();
  return auth ? <Protected /> : <Public />;
}

export default CombinedScreens;