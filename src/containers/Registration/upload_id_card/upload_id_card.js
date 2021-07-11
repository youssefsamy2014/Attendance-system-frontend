import React,{useState} from 'react';
import {Image}from 'react-bootstrap';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import classes from './upload_id_card.css'
import axios from '../../../axios-order';
import SnackBar from '../../../components/UI/SnackBar/SnackBar'



const Upload =(props)=> {
  const [open, setOpen] = useState(false); 
  const [close, setClose] = useState(false); 
    const[error,setError]=useState('')
    const[message,setMessage]=useState('')
  const[state,setState]=useState({
    Selectedfile: null,
    img: null
  });
 
const handleChange=(event)=>{
  const image = event.target.files[0];
  if (!image) {
    setOpen(true);
    setError(null)
    setMessage('image is required');
    return false;
    }
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      setOpen(true);
      setMessage(null);
      setError('Please select image.');
     return false;
    }
    const maxSize = '1024';

  const fsize = image.size/1024;
  if(fsize > maxSize) {
    setOpen(true);
    setMessage(null);
    setError('Maximum file size exceed : '+maxSize+'KB , This file size is: ' + fsize + "KB");
      return false;
  } else{
     
  setState(state=>({
    ...state.Selectedfile,
    Selectedfile:event.target.files[0],
    img:URL.createObjectURL(event.target.files[0])
  }))
  setClose(true)}
}


const  handleSubmit = () => {
  
  const files = state.Selectedfile,
  reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = function () {
    const b64 = reader.result.replace(/^data:.+;base64,/, '');
    const payload={"data":b64,
    name:props.fullname,
    id:props.idss,
    nid:props.nidss
  }
    axios.post('/Nationid', payload)
    .then(response => {
      setError(null)
       setMessage(response.data.message);
       setOpen(true);
  
    })
    .catch(err => {
      console.log(err)
      setOpen(true);
      setMessage(null)
      let er=err.message === 'Request failed with status code 401'
      if(!er){

      setError("Network error")
        
      }if(er){
        if (state.Selectedfile && props.fullname && props.idss && props.nidss){
          setError(err.response.data.error)  
        }
        else{
          setOpen(true);
          setMessage(null)
          setError('Choose your ID-card and Complete your information')
          
        }
      }
    });}
    
  
};

const handleClose = ( reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};  
    

  

    return (
      <div >
        <center>
        <div >
<div className={classes.button_wrap} >
  <label className ={classes.new_button} htmlFor="upload"> <center>Click here to choose Your ID Card  </center></label>
  <input type="file" id="upload" onChange={handleChange} />
</div>


    </div>    
 
<Image src={state.img} rounded className={classes.imgss} />
                                                      
        </center>
        <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        type="submit"
        style={{width:'100%'}}
        onClick={handleSubmit}
        disabled={!close}
        >Upload</Button>           
        <SnackBar  errors={error} success={message} close={handleClose} open={open}/>

      </div>
    );
    }

export default  Upload;