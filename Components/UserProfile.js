import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import LoginBackground from '../Images/LoginBackground.jpg';
import {Link, useHistory} from 'react-router-dom';
import "../App.css";

const UserProfile = () => {
  
    const logout=()=>
    {
        localStorage.clear();
        window.location.href = '/item';        
    }
  return (
      <div className="usermenu">
          <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                  {localStorage.username}&nbsp;({localStorage.RoleDesc})&nbsp; &nbsp;<img src={LoginBackground} height="25" width="35" />
                  
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item>
                      <div style={{width:'180px',textAlign:'center'}} onClick={logout}>Logout</div>
                  </Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
      </div>    
  );
};
export default UserProfile;
