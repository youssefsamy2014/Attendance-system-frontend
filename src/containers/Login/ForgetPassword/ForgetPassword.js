import React ,{useState} from 'react'
import axios from '../../../axios-order';
import Button from "@material-ui/core/Button";
import SnackBar from '../../../components/UI/SnackBar/SnackBar'
import { updateObject, checkValidity } from "../../../shared/utility";
import classes from "./ForgetPassword.css";
import Input from "../../../components/UI/Input/Input";
import { Redirect } from 'react-router';



const ResetPassword=(props)=>{
    const [open, setOpen] = useState(false); 
    const[error,setError]=useState('')
    const[message,setMessage]=useState('')
    const [form,setForm]=useState({
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'Password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          isPassword:true,
          minLength:6,
        },
        valid: false,
        touched: false
      },  
      cpassword: {
          elementType: "input",
          elementConfig: {
            type: "Password",
            placeholder: "Confirm-Password",
          },
          value: "",
          validation: {
            required: true,
            isPassword:true,
            minLength:6,
          },
          valid: false,
            touched: false,
        },
      })

      const handleClose = ( reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };  
          
    
      const [formIsValid, setFormIsValid] = useState(false);
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
     
  
const resetPasswordHandler=(e)=>{
e.preventDefault();

const payload = {
  email:  props.v_email,
  password:  form.password.value,
  cpassword:  form.cpassword.value,
};
axios.post('/resetPassword', payload)
.then(response => {
    setOpen(true);
    setError(null)
    setMessage(response.data.message);

})
.catch(err => {
  setOpen(true)
  setMessage(null)
  let er=err.message === 'Request failed with status code 401'
  if(!er){

  setError("Network error")
    
  }if(er){

    setError(err.response.data.error)  
  }

});
}



const passwordsArray = [];
for (let key in form) {
  passwordsArray.push({
id: key,
config: form[key],
});
}




let passwords = (
<form >
{passwordsArray.map((pass) => (
<Input
key={pass.id}
elementType={pass.config.elementType}
elementConfig={pass.config.elementConfig}
value={pass.config.value}
invalid={!pass.config.valid}
shouldValidate={pass.config.validation}
touched={pass.config.touched}
changed={(event) => inputChangedHandler(event, pass.id)}
/>))}
<Button
          className={classes.btn}
           variant="contained"
           color="Primary"
           size="large"
          disabled={!formIsValid}
          onClick={resetPasswordHandler}
          >
           Reset password
          </Button>
</form>
);

return(
<div>
<div className={classes.otpps}>
<div style={{ width: "100%",textAlign:'center',height:'50px',padding:'8px'}}><h5>Reset-Password</h5></div>
  {passwords}
</div>
{message?<Redirect to='/login'/>:null}

<SnackBar  errors={error} success={message} close={handleClose} open={open}/>
</div>
   );
    };
export default ResetPassword;