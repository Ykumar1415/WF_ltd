import React from "react";
import { connect } from "react-redux";
import { registerStudentAction } from "../../../redux/actions/registerStudentAction";
import { setAlert } from "../../../redux/actions/alertAction";

class StudentRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value
    });
  };

  emailInputHandler = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  };

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  };

  confirmpasswordInputHandler = (event) => {
    this.setState({
      ...this.state,
      confirmPassword: event.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.confirmPassword !== this.state.password) {
      this.props.setAlert({
        isAlert: false,
        type: "error",
        title: "Invalid Input",
        message: "Confirm Password does not match"
      });
      return;
    }
    this.props.registerStudentAction({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const formStyle = {
      margin: "20px",
      display: "inline-block",
      textAlign: "center",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      
    };

    const formTitleStyle = {
      fontSize: "1.7em"
    };

    const inputStyle = {
      display: "block",
      margin: "20px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc", 
      width:"300px", 
      height:"40px",
      fontSize:"20px"
    };

    const buttonStyle = {
      margin: "0px 40px",
      padding: "10px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#2196f3",
      color: "#fff",
      cursor: "pointer"
    };

    return (
      <form style={formStyle} onSubmit={(event) => this.handleSubmit(event)}>
        <div style={{ ...formTitleStyle, color: "#2196f3" }}>Register</div>
        <input
          style={inputStyle}
          placeholder="Enter username"
          type="text"
          value={this.state.username}
          onChange={(event) => this.usernameInputHandler(event)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Enter email"
          type="email"
          value={this.state.email}
          onChange={(event) => this.emailInputHandler(event)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Enter password"
          type="password"
          value={this.state.password}
          onChange={(event) => this.passwordInputHandler(event)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Enter password again"
          type="password"
          value={this.state.confirmPassword}
          onChange={(event) => this.confirmpasswordInputHandler(event)}
          required
        />
        <button style={buttonStyle} type="submit">
          Register
        </button>
      </form>
    );
  }
}

const mapStatetoProps = (state) => ({});

export default connect(mapStatetoProps, {
  registerStudentAction,
  setAlert
})(StudentRegisterForm);
