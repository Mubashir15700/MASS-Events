import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import Sidebar from './Sidebar';
import "./Navbar.css";

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
    <Header position="fixed" className="app">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Toolbar className="nav" style={{ marginLeft: 80 }}>
        <Tabs to="/"
          className={({ isActive }) =>
            isActive ? 'active' : 'inactive'
          }
        >
          All Events
        </Tabs>
        <Tabs to="/addevent">Add Event</Tabs>
        <Tabs to="/allstaffs">All Staffs</Tabs>
        <Tabs to="/addstaff">Add Staff</Tabs>
      </Toolbar>
    </Header>
  );
}

export default Navbar;