import React ,{useState} from 'react'
import axios from '../../../../axios-order';
import Button from "@material-ui/core/Button";
import SnackBar from '../../../../components/UI/SnackBar/SnackBar'
import { updateObject, checkValidity } from "../../../../shared/utility";
import classes from "./otp.css";
import Input from "../../../../components/UI/Input/Input";
import ResetPassword from '../ForgetPassword';


const Otp=()=>{
    const [open, setOpen] = useState(false);
    const [access, setAccess] = useState(false);

    const[error,setError]=useState('')
    const[message,setMessage]=useState('')
    const [otpForm,setOtpForm]=useState({
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter E-Mail'
        },
        value:'',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },  
      otps: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Enter OTP from Email sent to you",
          },
          value: "",
          validation: {
            required: true,
            isNumeric:true,
            minLength:6,
            maxLength:6,
          },
          valid: true,
          touched: true,
        },
      })
      
      const [formIsValid, setFormIsValid] = useState(false);
      const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(otpForm[inputIdentifier], {
          value: event.target.value,
          valid: checkValidity(
            event.target.value,
            otpForm[inputIdentifier].validation
          ),
          touched: true
        });

        const updatedOtpForm= updateObject(otpForm, {
          [inputIdentifier]: updatedFormElement
        });
    
        let formIsValid = true;
        for (let inputIdentifier in updatedOtpForm) {
          formIsValid = updatedOtpForm[inputIdentifier].valid && formIsValid;

        }
        setOtpForm(updatedOtpForm);
        setFormIsValid(formIsValid);
      };
     
  
const OTPHandler=(e)=>{
    e.preventDefault();
    const payload = {
      email:  otpForm.email.value,
    };
  
    axios.post('/verifyEmail2', payload)
    .then(response => {
       setOpen(true);
       setError(null)
       setMessage(response.data.message);
      //  localStorage.setItem('v_email',otpForm.email.value)
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
  
  
  const OTPChecker=(e)=>{
    e.preventDefault();
    const payload = {
      otp: otpForm.otps.value,
      email: otpForm.email.value,
    };
  
  
    axios.post('/otpchecker2', payload)
    .then(response => {
      setError(null);
      setMessage(response.data.message);
      setOpen(true);
      setAccess(true)

      
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
        setAccess(false)

    });
  }
  
  


  const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };  
      

  const otpArray = [];
  for (let key in otpForm) {
    otpArray.push({
      id: key,
      config: otpForm[key],
    });
  }

  let OTP = (
    <div className={classes.otpps}>
    <div  style={{ width: "100%",textAlign:'center',height:'50px',padding:'8px'}}>
    <h5 
      
      >Verify Your mail to reset password</h5>
    </div>
    
    {otpArray.map((otpElement) => (
      <Input
      key={otpElement.id}
      elementType={otpElement.config.elementType}
      elementConfig={otpElement.config.elementConfig}
      value={otpElement.config.value}
      invalid={!otpElement.config.valid}
      shouldValidate={otpElement.config.validation}
      touched={otpElement.config.touched}
      changed={event => inputChangedHandler(event, otpElement.id)}
      />))}
      <Button
          className={classes.btn}
           variant="contained"
           color="Primary"
           size="large"
          onClick={OTPHandler}
          disabled={!formIsValid}
          >
           Send otp to reset password
          </Button>
 
  <Button
  onClick={OTPChecker}
   variant="contained"
   color="secondary"
   size="large"
   className={classes.btn}
   disabled={!formIsValid}

   >
    Verify otp to reset password
  </Button>
  <SnackBar  errors={error} success={message} close={handleClose} open={open}/>

  </div>);


if (access){
  OTP=(<ResetPassword v_email={otpForm.email.value}/>);
}

    return(
      <div>
   
  {OTP}

      </div>
   );
};
export default Otp;