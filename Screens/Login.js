import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { APIWrapper, getHead } from "../Components/APIWrapper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Stylesheets/Login.css";
import foodBackground from "../Images/foodBackground.jpg";
import bg from "../Images/portal_bg.jpg";
import headerImg from "../Images/Weikfield-RGB-02.png";
import LoginBackground from "../Images/LoginBackground.jpg";
import Swal from "sweetalert2";
import useUserStore from "../Store/store";    

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
 
  const validateForm = () => {
    return user.username.length > 0 && user.password.length > 0;
  };
  // const getUserRole = async () => {
  //   let reqParam = {
  //     headers: getHead(),
  //     requestType: "GET",
  //     requestBody: {},
  //     path: "dashboard/getDashboardDetails",
  //   };
  //   let response = await APIWrapper(reqParam);
  //   console.log(response);
  //   console.log(response.status);
  //   if (response.status == "Success") {
  //     console.log(response.data.menu_details);  
  //     await setrole(response.data.menu_details);
  //     // localStorage.setItem("RoleId", response["data"].role_id);
  //     // localStorage.setItem("RoleDesc", response["data"].role_desc);

  //   }
  // };

  const submit = async () => {
    const data = { username: user.username, password: user.password };
    let reqParam = {
      headers: { "content-type": "application/json" },
      requestType: "POST",
      requestBody: data,
      path: "authenticate",
    };
    let response = await APIWrapper(reqParam);
    // debugger;
    console.log("response", response["token"]);

    if (response["token"]) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("username", data.username);
      // await getUserRole();
      props.history.push("/dashboard");
    } else if (response["status"] === 401) {
      //alert("401");
      Swal.fire({
        title: "Wrong User ID or Password,please check.",
        html: 'In case you have forgotten your password, click on Forgot Password',
        icon: "error",
      });
      props.history.push("/");
    }
  };

  const submitForgotPassword = async () => {
    if (user.username.length > 0) {
      const data = { username: user.username, password: user.password };
      let reqParam = {
        headers: { "content-type": "application/json" },
        requestType: "GET",
        requestBody: {},
        path: "getForgotPassword?userid=" + user.username,
      };
      let response = await APIWrapper(reqParam);
      if (response["status"] == "success") {
        Swal.fire({
          title: "Success!",
          html:
            "Password has been sent to the registered email id, kindly check your inbox.",
          icon: "Success",
        });
      } else {
        Swal.fire({
          title: "OOPS!",
          html: response["data"].message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "OOPS!",
        html:
          "User ID field is blank.Please enter the user id & then click on forgot password.",
        icon: "warning",
      });
    }
    //  }
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: window.innerHeight - 2 + "px",
      }}
    >
      {/* <div style={{border: '1px solid lightblue',width:'50%',marginLeft:'300px'}}> */}
      <div
        style={{
          backgroundColor: "#fff",
          height: "60%",
          width: "30%",
          top: "20%",
          left: "35%",
          position: "absolute",
          borderRadius: "6px",
        }}
      >
        <div>
          <img className="headerImg" src={headerImg} alt="" />
          <h5 style={{ color: "#00008b", padding: "4px" }}>
            <b>Item Creation Portal </b> 
          </h5>
        </div>
        <div> v 1.0 Released 29.07.2023 </div>
        {/* <h2 style={{color:'#00008b'}}>
                    <b><u>Login</u></b>
                  </h2> */}
        <form>
          <div className="form-group">
            {/* <label className="formLabel">User Name </label> */}
            <input
              type="text"
              className="formInput"
              id="username"
              name="username"
              placeholder="User Name"
              autoFocus
              value={user.username}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="login-password" className="formLabel">
                        Password{" "}
                      </label> */}
            <input
              type="password"
              className="formInput"
              id="password"
              name="password"
              placeholder="Password"
              aria-describedby="login-password"
              autoFocus
              value={user.password}
              onChange={onChange}
            />
          </div>

          <button
            className="btn-primary btn-block formInput"
            type="button"
            onClick={submit}
            disabled={!validateForm()}
          >
            Sign in
          </button>
        </form>

        <p className="link">
          <a onClick={submitForgotPassword}>
            <span>Forgot Password?</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);
