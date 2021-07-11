import React, { useEffect,Suspense } from "react"; // eslint-disable-next-line
import { Route, BrowserRouter, Redirect, Switch,IndexRoute  } from "react-router-dom";
// import {IndexRoute} from 'react-router'
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Logout from './containers/Login/Logout/Logout'
import classes from './App.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/Header/Header'
import P404 from './404'

const TestSocketIo = React.lazy(() => {
  return import("./containers/socket/socket");
});
const Landing = React.lazy(() => {
  return import('./components/landing page/landing');
});

const Otp = React.lazy(() => {
  return import('./containers/Login/ForgetPassword/otp/otp');
});

const DataGrids = React.lazy(() => {
  return import('./containers/Admin/Datagrid/Datagrid');
});


const DashBoard = React.lazy(() => {
  return import('./containers/Admin/Dashboard/Dashboard');
});

const Profile = React.lazy(() => {
  return import('./containers/Profile/Profile');
});

const Coordinators = React.lazy(() => {
  return import('./containers/Admin/Coordinators/Coordinators');
});

const Coordinatorids = React.lazy(() => {
  return import('./containers/Admin/IDs/Coordinatorids');
});

const DataGridAttendance = React.lazy(() => {
  return import('./containers/Coordinator/DataGridAttendance/DatagridAttendance');
});

const Attendance = React.lazy(() => {
  return import('./containers/Coordinator/Attendance/Attendance');
});

const Cour = React.lazy(() => {
  return import('./containers/Coordinator/Courses/Courses');
});


const Registration = React.lazy(() => {
  return import("./containers/Registration/Registration");
});

const Login = React.lazy(() => {
  return import("./containers/Login/Login");
});

const Recorder = React.lazy(() => {
  return import("./containers/ML/Recorder/Recorder");
});


const  ShowCards= React.lazy(() => {
  return import("./containers/Admin/ShowCards/ShowCards");
});



const App = (props) => {
  // eslint-disable-next-line
  useEffect(() =>{ props.onCheckAuth()},[]);
  let routes  = null
   if (props.isAuthenticated && props.ut==="coordinator") {
    routes = (
      <Switch>
        <Route  exact path="/" component={Profile}/> 
        <Route  path="/Courses" component={Cour} />
        <Route  path="/StudentsAttendance" component={DataGridAttendance} />
        <Route  path="/Attendance" component={Attendance} />
        <Route  path="/logout" component={Logout} />
        <Redirect to="/"/>
        <Route  path='*' component={P404}/>

      </Switch>
    );
  }
  else if(props.isAuthenticated && props.ut==="student"){
    routes = (
    <Switch>
    <Route  exact path="/" component={Recorder} />
    <Route  path="/logout" component={Logout} />
    <Redirect to="/"/>
    <Route  path='*' component={P404}/>
  </Switch>
    );
  }else if (props.isAuthenticated && props.ut==="admin") {
    routes = (
      <Switch>
        <Route  exact path="/"  component={Profile} />
        <Route  path="/DashBoard" component={DashBoard} />
        <Route  path="/coor" component={Coordinators} />
        <Route  path="/coorids" component={Coordinatorids} />
        <Route  path="/Students" component={DataGrids} />
        <Route  path="/cards" component={ShowCards} />
        <Route  path="/logout" component={Logout} />
        <Redirect to="/"/>
        <Route  path='*' component={P404}/>

      </Switch>
    );
  } else{
    routes  = (
      <Switch>
        <Route  exact path="/" component={Landing} />
        <Route   path="/socket" component={TestSocketIo} />
        <Route  path="/login" component={Login} />
        <Route  path="/Registration" component={Registration} />
        <Route  path="/vemail" component={Otp} />
        <Route  path='*' component={P404}/>
      </Switch>
      );
  }


  return (

   <div   className={classes.home}>
     <BrowserRouter>
     <Header />
     <Suspense fallback={ <CircularProgress color="secondary" />}>
    {routes}
    
    </Suspense>
     </BrowserRouter>
 </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    ut:state.auth.usertype,
    paths:state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth: () => dispatch(actions.authCheckState()),
  };
};
export default  connect(mapStateToProps, mapDispatchToProps)(App);
