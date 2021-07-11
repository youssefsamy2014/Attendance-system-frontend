import React ,{useState} from 'react';
import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Login.css' 
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import {Redirect,Link} from 'react-router-dom'
import SnackBar from '../../components/UI/SnackBar/SnackBar'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";


const Login =(props)=>{
const [open, setOpen] =useState(false);
const [vis, setVis] =useState(false);
const [form, setForm] = useState({
    email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type:'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
        required: true,
        isPassword: true,
        minLength: 6,
        },
        valid: true,
        touched: false
      }
    });


    
  // const [formIsValid, setFormIsValid] = useState(false);
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

    // let formIsValid = true;
    // for (let inputIdentifier in updatedForm) {
    //   formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    // }

    setForm(updatedForm);
    // setFormIsValid(formIsValid);
  };
 
    const sendDetailsToServer = () => {
        const payload={
        email:form.email.value.toLowerCase(),
        password:form.password.value,
        }
        props.onAuth(payload);

      };
    
      const submitHandler = (e) => {
        e.preventDefault();
        sendDetailsToServer();
        props.deleteImg()
        setOpen(true);

      }
  

const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key]
    });
  }

const switchCaseHandler=()=>{
  if( form.password.elementConfig.type ==='password'){
    form.password.elementConfig.type='text'
    setVis(true)
  }else{
    form.password.elementConfig.type='password'
    setVis(false)
  }
}

let forms = (
    <form  >
      {formElementsArray.map(formElement => (
        <Input
        
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
           invalid={!formElement.config.valid}
           shouldValidate={formElement.config.validation}
           touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />

      ))}
      <Link to='/vemail'style={{fontSize:'13px',textDecoration:'none',left:'65%',position:'absolute',top:'75px'}}>Forget password ?</Link>
      <br/>
             <Button variant="contained" color="default" style={{width:'100%'}}onClick={submitHandler} >SignIn</Button>
             
    </form>
  );


  const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
return(
  <div className={classes.page}>
      <div className={classes.back}>

<div className={classes.login}  >
    {forms}
    <span >
{vis?   <VisibilityIcon onClick={switchCaseHandler} className={classes.v}/>
 :<VisibilityOffIcon onClick={switchCaseHandler} className={classes.v}/>
}
    </span>
</div>

<SnackBar  errors={props.error} success={null} close={handleClose} open={open}/>

{props.isAuthenticated && props.ut ? <Redirect to="/" /> :null }
  </div>
  </div>
  
    );
};

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    ut:state.auth.usertype!== null,
    fid:state.auth.studentid
  };
};

const mapDispatchToProps = dispatch => {
  return {

    onAuth: (payload) =>dispatch(actions.auth(payload)),
    deleteImg: () =>dispatch(actions.deletes()),

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login)
