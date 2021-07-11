import React ,{useState} from 'react'
import axios from '../../../axios-order';
import Button from "@material-ui/core/Button";
import SnackBar from '../../../components/UI/SnackBar/SnackBar'
import { updateObject, checkValidity } from "../../../shared/utility";
import classes from "./OtpChecker.css";
import Input from "../../../components/UI/Input/Input";



const OTPCheck=(props)=>{
    const [open, setOpen] = useState(false); 
    const [click, setClicked] = useState(false); 
    const[error,setError]=useState('')
    const[message,setMessage]=useState('')
    const [form,setForm]=useState({
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
            minLength:5,
            maxLength:6,
          },
          valid: false,
            touched: false,
        },
      })
      

const OTPHandler=(e)=>{
    e.preventDefault();
    
    const payload = {
      email:  props.savedEmail.toLowerCase(),
    };
  
    axios.post('/verifyEmail', payload)
    .then(response => {
       setMessage(response.data.message);
       setOpen(true);
       setClicked(true)

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
        setClicked(false)

    });
  }
  
  
  const OTPChecker=(e)=>{
    e.preventDefault();
    const payload = {
      otp: form.otps.value,
      email: props.savedEmail.toLowerCase(),
    };
  
  
    axios.post('/otpchecker', payload)
    .then(response => {
      setError(null);
      setMessage(response.data.message);
      setOpen(true);
      setClicked(false)

      
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
        setClicked(true)

    });
  }
  
  


  const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };  
      

  const otpArray = [];
  for (let key in form) {
    otpArray.push({
      id: key,
      config: form[key],
    });
  }

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
 


  let OTP = (
    otpArray.map((otpp) => (
      <Input
        key={otpp.id}
        elementType={otpp.config.elementType}
        elementConfig={otpp.config.elementConfig}
        value={otpp.config.value}
        invalid={!otpp.config.valid}
        shouldValidate={otpp.config.validation}
        touched={otpp.config.touched}
        changed={(event) => inputChangedHandler(event, otpp.id)}
      />)));
  let otpPage= (<Button
          className={classes.btn1}
           variant="contained"
           color="secondary"
           size="large"
           disabled={!props.val}
          onClick={OTPHandler}
          >
          Click me to verify your email 
          </Button>);
          if (click){
otpPage=(<div className={classes.otpps} >
<div  style={{ width: "100%",textAlign:'center',height:'50px',padding:'8px'}}>
<h5 
  
  >Verify Your mail</h5>
</div>

  {OTP}

 
  <Button
  onClick={OTPChecker}
   variant="contained"
   color="default"
   size="large"
   disabled={!formIsValid}

   className={classes.btn}>
    Verify OTP
  </Button>




</div>);
          }
    return(
      <div>
    {otpPage}
        <SnackBar  errors={error} success={message} close={handleClose} open={open}/>

      </div>
   );
};
export default OTPCheck;