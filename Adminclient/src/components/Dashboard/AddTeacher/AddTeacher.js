import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddTeacher.css";
import axios from "axios";
import apis from "../../../services/Apis";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };
  }

  nameInputHandler = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  emailInputHandler = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  confirmInputHandler = (event) => {
    this.setState({
      ...this.state,
      confirmpassword: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.confirmpassword !== this.state.password) {
      Alert("error", "Invalid Input", "Confirm Password does not match");
    }
    console.log(this.state);
    axios
      .post(
        apis.BASE + apis.ADD_TEACHER,
        {
          username: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.retriveToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          Alert("info", "Success", response.data.message);
        } else {
          Alert("error", "Failed", response.data.message);
        }
      });
  };

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return <div></div>;
    }
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add Teacher</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.nameInputHandler}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={this.state.email}
            onChange={this.emailInputHandler}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.passwordInputHandler}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            value={this.state.confirmpassword}
            onChange={this.confirmInputHandler}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Add Teacher
        </button>
        <br />
        <button>
          <Link className="linkbtn" to="/home"  style={styles.linkButton}>
            Back
          </Link>
        </button>
      </form>
    );
  }
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    background: "#F6F9FE"
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: "15px",
    width: "60%",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
  linkButton: {
 
    padding: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    color: "white",
    textDecoration: "none",
    backgroundColor: "red",
    
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAdminDetails,
})(AddTeacher);
