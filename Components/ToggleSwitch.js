import React from "react";
import "./toggleSwitch.css";
import { APIWrapper, getHead, API_ENDPOINT } from "../Components/APIWrapper";


const ToggleSwitch = ({ label, checked, onChange, disabled }) => {
  return (
    <div style={{ marginLeft:'20px',width:'150px'}} className="container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} disabled={disabled} checked={checked} onChange={(e)=>onChange(e.target.checked)} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
        
      </div>
      
    </div>
  );
};

export default ToggleSwitch;
