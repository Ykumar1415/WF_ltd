import React from "react";
import { connect } from "react-redux";
import { loginRequestAction } from "../../../redux/actions/loginAction";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

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

  handleSubmit(event) {
    event.preventDefault();
    this.props.loginRequestAction(this.state);
  }

  render() {
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '300px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize:"20px"
    };

    const inputStyle = {
      margin: '10px 0',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
       
      height:"40px",
      fontSize:"20px"
    };

    const buttonStyle = {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#2196f3',
      color: '#fff',
      cursor: 'pointer',
      fontSize:"20px"
    };
    const buttonHoverStyle = {
      backgroundColor: '#1565c0'
    };
    return (
      <form style={formStyle} onSubmit={(event) => this.handleSubmit(event)}>
        <div style={{ marginBottom: '20px', fontSize: '20px', textAlign: 'center', color: '#2196f3' }}>
          LOGIN
        </div>
        <input
          style={inputStyle}
          placeholder='Enter email'
          type='email'
          value={this.state.email}
          onChange={(event) => this.emailInputHandler(event)}
          required
        />
        <input
          style={inputStyle}
          placeholder='Enter password'
          type='password'
          value={this.state.password}
          onChange={(event) => this.passwordInputHandler(event)}
          required
        />
        <button style={buttonStyle} type='submit'
         
        >
          Login
        </button>
      </form>
    );
  }
}

const mapStatetoProps = (state) => ({
  state: state.user
});

export default connect(mapStatetoProps, {
  loginRequestAction
})(LoginForm);
