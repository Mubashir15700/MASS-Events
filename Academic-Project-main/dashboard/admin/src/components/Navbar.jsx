import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

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
    <Header position="static">
      <Toolbar>
        <Tabs to="/">All Events</Tabs>
        <Tabs to="/addevent">Add Event</Tabs>
        <Tabs to="/allstaffs">All Staffs</Tabs>
        <Tabs to="/addstaff">Add Staff</Tabs>
      </Toolbar>
    </Header>
  );
}

export default Navbar;