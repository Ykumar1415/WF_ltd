import React,{useEffect} from "react";
import "../Stylesheets/dashboard.css";
import homeImage from "../Images/item_home.jpg";
const Dashboard=()=>
{       
  const goBack = () => {
    window.history.back();
  };
    return (
    <>
    <h5 className="dashboardContent">Welcome to Item Creation portal!</h5>
        <img src={homeImage} alt="BigCo Inc. logo" className="homeImage"/>
        <button onClick={goBack}>Go Back</button>
    </>
    );
}

export default Dashboard;