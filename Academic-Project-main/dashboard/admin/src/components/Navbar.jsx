import { useEffect, useState } from "react";
import { checkAuth } from "../services/api";
import { AppBar, Toolbar, styled } from "@mui/material";
import { BsFillCalendarCheckFill, BsFillCalendarPlusFill, BsFillPersonLinesFill, BsFillPersonPlusFill } from "react-icons/bs";
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

  const [user, setUser] = useState([]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    let response = await checkAuth();
    response && setUser(response.data.currentStaff);
  }

  return (
    <Header position="fixed" className="app">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} user={user.username} />
      <Toolbar className="nav" style={{ marginLeft: 80 }}>
        <Tabs to="/"
          className={({ isActive }) =>
            isActive ? 'active' : 'inactive'
          }
        >
          <BsFillCalendarCheckFill style={{ marginRight: 5 }} />
          All Events
        </Tabs>
        <Tabs to="/addevent"><BsFillCalendarPlusFill style={{ marginRight: 5 }} />Add Event</Tabs>
        <Tabs to="/allstaffs"><BsFillPersonLinesFill style={{ marginRight: 5 }} />All Staffs</Tabs>
        <Tabs to="/addstaff"><BsFillPersonPlusFill style={{ marginRight: 5 }} />Add Staff</Tabs>
      </Toolbar>
    </Header>
  );
}

export default Navbar;