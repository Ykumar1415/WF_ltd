import React, { useEffect, useState } from "react";
//import ReactDOM from "react-dom";
import styled from 'styled-components';
// import Settings from "../dashboardComponent/Settings";
// // import Profile from "../User/userprofile/UserProfile";
// import swal from "sweetalert";
// import { API_URL } from "../../config";
//import $ from "jquery";
import Profile from "./UserProfile";
import LoginBackground from "../Images/LoginBackground.jpg";

const HeaderBar = styled.header`
width: 87.2%,
padding: 0.5em 1em,
display: flex,
height: 68px,
position: fixed,
align-items: center,
background-color: #fff,
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
z-index: 1,
`;
const Header = () => {
    return(
    <HeaderBar>
        {/* <img src={LoginBackground} alt="" height="68" width="190" /> */}
        {localStorage.username !=undefined && localStorage.username !="" ? <Profile />:<></>}    </HeaderBar>
//   const [colapsed, setColapsed] = useState(1);
//   const [firstRowData, setFirstRowData] = useState("");
//   const [secondRowData, setSecondRowData] = useState("");
//   const [imageName, setImageName] = useState("cp.jpg");
//   //this.getuserinfo=this.getuserinfo.bind(this)

//   useEffect(() => {
//     console.clear();
//     let first_row_data = "";
//     let second_row_data = "";
//     first_row_data =
//       localStorage.getItem("empCode") + " - " + localStorage.getItem("emailId");
//     if (localStorage.getItem("userType") === "distributor") {
//       if (localStorage.getItem("phoneNo") === "undefined") second_row_data = "";
//       else second_row_data = localStorage.getItem("phoneNo");
//     } else {
//       if (localStorage.getItem("phoneNo") === "undefined") second_row_data = "";
//       else second_row_data = localStorage.getItem("phoneNo");
//     }
//     let img_name = "avatar-s-11.jpg";
//     if (localStorage.getItem("userType") === "distributor") img_name = "cp.jpg";
//     if (localStorage.getItem("userType") === "back office") img_name = "bo.jpg";
//     if (localStorage.getItem("userType") === "sales officer")
//       img_name = "so.jpg";
//     if (localStorage.getItem("userType") === "approver") img_name = "ap.jpg";

//     if (localStorage.getItem("userType") === "price manager")
//       img_name = "pm.jpg";
//     setFirstRowData(first_row_data);
//     setSecondRowData(second_row_data);
//     setImageName(img_name);
//     //this.setState({first_row_data:first_row_data,second_row_data,second_row_data,image_name:img_name})
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };
//   const profile = () => {
//     console.log("hi");
//     ReactDOM.render(<Profile />, document.getElementById("c11"));
//   };
//   const menuu = () => {
//     console.log("menu te dhukechissssssssss");
//     //if($("#root").hasClass("menu-expanded"))

//     //if(this.state.colapsed==1)
//     // if ($("#root").hasClass("menu-expanded")) {
//     //   document.getElementById("menubarkor").removeAttribute("class");
//     //   document
//     //     .getElementById("menubarkor")
//     //     .setAttribute(
//     //       "class",
//     //       "main-menu menu-fixed menu-light menu-accordion menu-shadow"
//     //     );
//     //   document.getElementById("root").removeAttribute("class");

//     //   document
//     //     .getElementById("root")
//     //     .setAttribute(
//     //       "class",
//     //       "vertical-layout navbar-floating footer-static pace-done vertical-menu-modern menu-collapsed"
//     //     );

//     //   setColapsed(2);
//     // } else {
//     //   document.getElementById("menubarkor").removeAttribute("class");
//     //   document
//     //     .getElementById("menubarkor")
//     //     .setAttribute(
//     //       "class",
//     //       "main-menu menu-fixed menu-light menu-accordion menu-shadow expanded"
//     //     );
//     //   document.getElementById("root").removeAttribute("class");

//     //   document
//     //     .getElementById("root")
//     //     .setAttribute(
//     //       "class",
//     //       "vertical-layout navbar-floating footer-static pace-done vertical-menu-modern menu-expanded"
//     //     );

//     //   setColapsed(1);
//     // }
//   };
//   return (
//     <nav class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
//       <div class="navbar-container d-flex content">
//         <div class="bookmark-wrapper d-flex align-items-center">
//           {/* <ul class="nav navbar-nav d-xl-none">
//                     <li class="nav-item"><a onClick={()=>this.menuu()} class="nav-link menu-toggle" href="javascript:void(0);"><i class="ficon" data-feather="menu"></i></a></li>
//                 </ul> */}
//           <a class="nav-link nav-link-style" onClick={menuu}>
//             {" "}
//             <i class="fas fa-bars"></i>
//           </a>
//           {/* <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-style"><i class="ficon" data-feather="user"></i></a></li> */}
//         </div>
//         <ul class="nav navbar-nav align-items-center ml-auto">
//           <li class="nav-item dropdown dropdown-user">
//             <a
//               class="nav-link dropdown-toggle dropdown-user-link"
//               id="dropdown-user"
//               href="javascript:void(0);"
//               data-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               <div class="user-nav d-sm-flex d-none">
//                 <span class="user-name font-weight-bolder">{firstRowData}</span>

//                 <span class="user-status">{secondRowData}</span>
//               </div>
//               <span class="avatar">
//                 <img
//                   class="round"
//                   src={
//                     "../../../app-assets/images/portrait/small/" +
//                     this.state.image_name
//                   }
//                   alt="avatar"
//                   height="40"
//                   width="40"
//                 />
//                 <span class="avatar-status-online"></span>
//               </span>
//             </a>
//             <div
//               class="dropdown-menu dropdown-menu-right"
//               aria-labelledby="dropdown-user"
//             >
//               <a class="dropdown-item" onClick={profile} href="#">
//                 <i class="mr-50" data-feather="user"></i> Profile
//               </a>
//               <div class="dropdown-divider"></div>
//               <a class="dropdown-item" onClick={logout}>
//                 <i class="mr-50" data-feather="power"></i> Logout
//               </a>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
    );
};
export default Header;
