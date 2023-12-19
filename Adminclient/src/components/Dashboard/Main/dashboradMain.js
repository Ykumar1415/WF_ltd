import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from '../../basic/Homepage/2070384.jpg'
import { MainCard } from "../Card/card";
import TeacherImg from '../teacher.jpg';
import StudentImg from '../student.jpg';
import SubjectImg from '../subject.jpg';
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";
import './dashboardMain.css';

const useStyles = (theme) => ({
  logout_btn: {
    marginLeft: '80%'
  },
  headerMargin: {
    marginTop: 80
  },
  inlineblock: {
    display: 'inline-block'
  },
  linkbtn: {
    color: 'black'
  }
})

class DashboardMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.expand = "none"
  }

  logout(obj) {
    obj.props.logoutUser();
    obj.forceUpdate();
  }

  handleTableExapand(type) {
    console.log("handle table")
    if (type === this.expand) {
      this.expand = "none"
    } else {
      this.expand = type
    }
    this.forceUpdate();
  }

  render() {
    console.log(this.props.user);
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>);
    } else {
      if (!this.props.dashboardDetails.retrived) {
        this.props.getDashboardCount();
      }
      let x;
      if (this.expand === "Teacher") {
        x = <TeacherTable />;
      } else if (this.expand === "Student") {
        x = <StudentTable />;
      } else if (this.expand === "Subject") {
        x = <SubjectTable />;
      }
      return (
        <>

          <HomepageHeader title='Examie' img={logoImg} />
          <div className={this.props.classes.headerMargin}>

          </div>
          <button onClick={() => (this.logout(this))} className={this.props.classes.logout_btn + " btn"} >Logout</button>
          <br />
          <div >
            <div style={{ background: " #F6F9FE", display: "flex", gap: "3rem", margin: "10px", }}>
              <MainCard title='Teacher' value={this.props.dashboardDetails.teacherActive} total={this.props.dashboardDetails.teacherActive + this.props.dashboardDetails.teacherBlocked} image={TeacherImg} />
              <div className={this.props.classes.inlineblock} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button className="btn" ><Link to="/addTeacher" className={this.props.classes.linkbtn}>
                  Add Teacher
                </Link>
                </button>
                <br />
                <button className="btn" onClick={() => (this.handleTableExapand("Teacher"))}>Show</button>
              </div>
            </div>
            <div style={{ background: " #F6F9FE", display: "flex", gap: "3rem", margin: "10px" }}>
              <MainCard title='Student' value={this.props.dashboardDetails.studentActive} total={this.props.dashboardDetails.studentActive + this.props.dashboardDetails.studentBlocked} image={StudentImg} />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> <button className="btn" onClick={() => (this.handleTableExapand("Student"))}>Show</button></div>
            </div>
            <div style={{ background: " #F6F9FE", display: "flex", gap: "3rem", margin: "10px" }}>
              <MainCard title='Subject' value={this.props.dashboardDetails.subjectActive} total={this.props.dashboardDetails.subjectActive + this.props.dashboardDetails.subjectBlocked} image={SubjectImg} />
              <div className={this.props.classes.inlineblock} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button className="btn" ><Link to="/addSubject" className={this.props.classes.linkbtn}>Add Subject</Link></button>
                <br />
                <button className="btn" onClick={() => (this.handleTableExapand("Subject"))}>Show</button>
              </div>
              <br />

            </div>
          </div>
          <div style = {{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{ position: "relative", height: "auto", zIndex: "10", width: "10rem", backgroundColor: "white" }}>
              {x}
            </div>
          </div>
        </>
      );

    }

  }
}

const mapStateToProps = state => ({
  user: state.user,
  dashboardDetails: state.dashboardDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));
