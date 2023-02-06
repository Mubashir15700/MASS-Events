import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Header = styled(AppBar)`
  background: #111111;
`

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px; 
  color: #fff;
  text-decoration: none;
`

const Navbar = () => {
  return (
    <Header position="static" className="app">
      <Toolbar className="nav">
        <Tabs to="/" 
          className={({ isActive }) => 
            isActive ? 'active' : 'inactive'
          }
        >
          All Events
        </Tabs>
        <Tabs to="/addevent">Add Event</Tabs>
        <Tabs to="/bookings">Bookings</Tabs>
        <Tabs to="/attendance">Attendance</Tabs>
        <Tabs to="/payments">Payments</Tabs>
        <Tabs to="/allstaffs">All Staffs</Tabs>
        <Tabs to="/addstaff">Add Staff</Tabs>
      </Toolbar>
    </Header>
  );
}

export default Navbar;