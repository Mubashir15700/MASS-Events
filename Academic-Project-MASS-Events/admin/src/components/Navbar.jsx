import { useEffect, useState } from "react";
import { checkAuth } from "../services/api";
import { AppBar, Toolbar, styled } from "@mui/material";
import { 
  BsFillCalendarMinusFill, 
  BsFillCalendarPlusFill, 
  BsFillPersonLinesFill, 
  BsFillPersonPlusFill } from "react-icons/bs";
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
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} user={user} />
      <Toolbar className="nav" style={{ marginLeft: 100 }}>
        <Tabs to="/"
          className={({ isActive }) =>
            isActive ? 'active' : 'inactive'
          }
        >
          <BsFillCalendarMinusFill style={{ marginRight: 5 }} />
          All Events
        </Tabs>
        <Tabs to="/add_event"><BsFillCalendarPlusFill style={{ marginRight: 5 }} />Add Event</Tabs>
        <Tabs to="/all_staffs"><BsFillPersonLinesFill style={{ marginRight: 5 }} />All Staffs</Tabs>
        <Tabs to="/add_staff"><BsFillPersonPlusFill style={{ marginRight: 5 }} />Add Staff</Tabs>
        <p style={{ marginLeft: 500, fontSize: 20 }}>MASS Events</p>
      </Toolbar>
    </Header>
  );
}

export default Navbar;