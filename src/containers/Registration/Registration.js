import React, { useState,useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import { updateObject, checkValidity } from "../../shared/utility";
import classes from "./Registration.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "@material-ui/core/Button";
import Upload from "./upload_id_card/upload_id_card"
import SnackBar from '../../components/UI/SnackBar/SnackBar'
import SignUPWithGmail from './SignUPWithGmail/SignUPWithGmail'
import OTPCheck from './OtpChecker/OtpChecker'
import {ListGroup } from 'react-bootstrap';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modals from '../../components/UI/modal/modal'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

const Registration = (props) => {
  const [open, setOpen] = useState(false);
  const [vis, setVis] =useState(false);

  const [form, setForm] = useState({
    nationalid: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "National ID",
        autoComplete:"false"

      },
      value: "",
      validation: {
        required: true,
        minLength: 14,
        maxLength: 14,
        isNumeric:true,

      },
      valid: false,
      touched: false,
    },
    firstname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name",
        autoComplete:"false"
      },
      value: localStorage.getItem('givenName'),
      validation: {
        required: true,
        isText:true,

      },
      valid: false,
      touched: false,
    },

    lastname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last Name",
        autoComplete:"false"

      },
      value:  localStorage.getItem('familyName'),
      validation: {
        required: true,
        isText:true,

      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
        autoComplete:"false"

      },
      value:localStorage.getItem('email'),
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
        autoComplete:"false"

      },
      value: "",
      validation: {
        required: true,
        isPassword: true,
        minLength: 8,

      },
      valid: false,
      touched: false,
    },

    facultyid: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Student ID",
        autoComplete:"false"

      },
      value: "",
      validation: {
        required: true,
      isNumeric:true,
      minLength:6,
      maxLength:7,
      },
      valid: false,
      touched: false,
    },
    

    faculty: {
      elementType: 'select',
      elementp:{
        placeholder: "FacultyID",

      },
      elementConfig: {

        options: [
          { value: 'FCI', displayValue: 'FCI' },
      
        ]
      },
      value: 'FCI',
      validation: {  required: true,},
      valid: true,
      touched: true,

    },

    
    dept: {
      elementType: 'select',
      elementConfig: {
        placeholder: "Department",

        options: [
          { value: 'CS', displayValue: 'CS' },
          { value: 'IT', displayValue: 'IT' },
          { value: 'IS', displayValue: 'IS' },
          { value: 'SE', displayValue: 'SE' }
        ]
      },
      value: 'CS',
      validation: {  required: true,},
      valid: true,
      touched: true,

    }
  });
  const [modalShow, setModalShow] =useState(false);

  const [formIsValid, setFormIsValid] = useState(false);



  useEffect(() => {
    if (localStorage.getItem('email')){localStorage.removeItem('email')}
  },[props])

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(form[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        form[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedForm= updateObject(form, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;

    }
    setForm(updatedForm);
    setFormIsValid(formIsValid);
    
  };
 



  const sendDetailsToServer = () => {
    const payload = {
      dept: form.dept.value,
      email: form.email.value.toLowerCase(),
      faculty: form.faculty.value,
      facultyid: form.facultyid.value,
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      nationalid: form.nationalid.value,
      password: form.password.value,
      usertype: "student",
    };
    props.onRegister(payload);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendDetailsToServer();
    setOpen(true);
  
  };

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }
 


  const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const switchCaseHandler=()=>{
    if( form.password.elementConfig.type ==='password'){
      form.password.elementConfig.type='text'
      setVis(true)
    }else{
      form.password.elementConfig.type='password'
      setVis(false)
    }
  }
  let inputs = (
    
   
      formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />)));
  
        const namess=form.firstname.value+'_'+form.lastname.value
const tipsss=(
  <div
className={classes.info}>
      <p>This is instruction you <span style={{color:'red' }}>MUST DO IT... </span></p>
      <ListGroup>
  <ListGroup.Item variant='danger'><span style={{color:'red' }}>ALL INFORMATION REQUIRED !!!</span></ListGroup.Item>
  <ListGroup.Item  variant="warning">Email like this : test@test.com</ListGroup.Item>
<ListGroup.Item variant="primary">The password must contain at least 1 lowercase alphabetical character</ListGroup.Item>

<ListGroup.Item variant="primary">The password must contain at least 1 uppercase alphabetical character</ListGroup.Item>

<ListGroup.Item variant="primary">The password must contain at least 1 numeric character</ListGroup.Item>

<ListGroup.Item variant="primary">The password must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict</ListGroup.Item>
<ListGroup.Item variant="primary">The password must be 8 characters or longer </ListGroup.Item>
  <ListGroup.Item variant="warning">Student-id length from 6 : 7</ListGroup.Item>
  <ListGroup.Item variant="success">after complete information Click on "verify email" to complete registration</ListGroup.Item>
  <ListGroup.Item variant="info">after complete information Upload your Egyption National-id</ListGroup.Item>
</ListGroup>
      </div>
)
  return (
    <div className={classes.page}>


<div className={classes.flexbox}>


<div className={classes.registration}>
        <h3>Registeration Form</h3>
      <form onSubmit={submitHandler}>
      <Button variant="contained"
        color="secondary" onClick={() => setModalShow(true)} focus>
       <LabelImportantIcon/> Show input validations
        </Button>
        {inputs}
      
        
        <Button
        variant='contained'
        color="secondary"
        disabled={!formIsValid}
        onClick={submitHandler}
        className={classes.btn}
        style={{marginTop:'4px',marginLeft:'10px',backgroundColor:'deepskyblue' }}
        size="large"
        >REGISTER</Button>
        <div className={classes.fandg}>
        <SignUPWithGmail/>

        </div>

      </form>

  {vis?<VisibilityIcon onClick={switchCaseHandler} className={classes.v} />
 :<VisibilityOffIcon onClick={switchCaseHandler} className={classes.v}/>
}
      </div>
     

      <div className={classes.up}>
      <Upload  fullname={namess} idss={form.facultyid.value} nidss={form.nationalid.value}/> 

      </div>
      <div className={classes.otpssss}>
   <OTPCheck savedEmail={form.email.value} val={formIsValid}/>
  
      </div>


</div>




<Modals show={modalShow}onHide={() => setModalShow(false)}bodyy={tipsss}/>
<SnackBar  errors={props.error} success={null} close={handleClose} open={open}/>


{!props.error && props.message ? <Redirect to="/Login" /> : null}
  
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.register.error,
    message: state.register.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (payload) => dispatch(actions.register(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
