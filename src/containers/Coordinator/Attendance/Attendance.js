import React,{useState,useEffect} from 'react';
import axios from '../../../axios-order'
import classes from './Attendance.css'
import VideoRecorder from 'react-video-recorder'
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SnackBar from '../../../components/UI/SnackBar/SnackBar';



const Attendance = (props) => {
  const [rows,setRows]=useState([])
  useEffect(() => {
    const axiosConfig={headers: {'x-access-token':props.token}};
    axios.get('/readCourse/'+props.nid,axiosConfig)
    .then(response=>{ 
          const eachRow=[]
          for (let key in response.data.rows) {
            eachRow.push({
              id:key,
            ...response.data.rows[key]
            });
            }
            setRows(eachRow)
            setOpen(true)
          setError(null)
          setMessage(response.data.message)
        })
        .catch(err=>{
          setOpen(true)
          setMessage(null)
                          let er=err.message === 'Request failed with status code 401'

          if(!er){

          setError("Network error")
            
          }if(er){

            setError(err.response.data.error)  
          }
        })},[props]);

        const [open, setOpen] = useState(false);
        const [error,setError]=useState('')
        const [message,setMessage]=useState('')
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [attend, setAttend] = useState([]);
  const [valid,setValid]=useState(true)
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)

  };
//----------------------------------------------

const handleClose = ( reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};


  const handleSubmit =() => {
      const zlib = require("zlib");
      const reader = new FileReader(); 
      reader.readAsDataURL(recordedChunks); 
      reader.onloadend = function () { 
      const b64 = reader.result.replace(/^data:.+;base64,/, '');
      let input = b64;
      zlib.deflate(input, (err, buffer) => {
        const payload={
          "video":buffer.toString('base64'),
          "bufferSize":buffer.byteLength,
          "course": value,
    
            }
            let axiosConfig = {
              headers: {
                'x-access-token':props.token,
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin': "*",
                  'Access-Control-Allow-Credentials': true,
              },crossDomain: true
          };
            axios.post('/Attendance/'+props.nid, payload,axiosConfig)
                .then( (res) =>{
                  const att =[];
                  for (let key in res.data.students_attended_today) {
                  att.push({
                  id: key,
                  ...res.data.students_attended_today[key]
                  })
                   }
                   setAttend(att)
                   setOpen(true)
                   setError(null)
                   setMessage(res.data.error)
                  }
                   )
                .catch( (err) =>{
                  setOpen(true)
                  setMessage(null)
                                  let er=err.message === 'Request failed with status code 401'

                  if(!er){
        
                  setError("Network error")
                    
                  }if(er){
        
                    setError(err.response.data.error)  
                  }
                
                
                });


        });

      }
    
  }

const attendLabel=attend.map(a=>(<div className={classes.attend} key={a.id}>
  <h3>{a.name} : {a.facultyid}</h3>
  <div className={classes.date}>Date : {a.date}</div>
  <div className={classes.time}>Time : {a.time}</div>
  <div className={classes.inout}> INOUT : {a.inout}</div>
  <div className={classes.course}> Course Code : {a.course}</div>
</div>))




let form = (

      <FormControl component="fieldset">
      <FormLabel component="legend">Courses</FormLabel>
      <RadioGroup aria-label="aria-label" value={value} onChange={handleChange}>
      {rows.map((formElement) => ( 
      <FormControlLabel 
      value={formElement.coursecode} 
      control={<Radio />} 
      label={formElement.coursename+"       "+formElement.coursecode }/>
      ))}
      </RadioGroup>
      
      <Button variant="contained" 
      color="primary" 
      className={classes.Button } 
      type="submit"
      style={{margin:'7px',background:'#2D8EDD'}}
      disabled={valid}
      onClick={handleSubmit}
      >Take Attendance</Button >
      </FormControl>
);



  return (
    <div className={classes.container}>
     
      <div className={classes.camcon} >
      <VideoRecorder  timeLimit={30000}
    className={classes.cam}
    onRecordingComplete={videoBlob => {
      setValid(false)
      setRecordedChunks(videoBlob)
}}
      />

</div>
<div className={classes.f}>

  {form}
</div>

  <br/>
<div className={classes.l}>
{attendLabel}

</div>
<br/>
<SnackBar  errors={error} success={message} close={handleClose} open={open}/>

</div>

  );
};

 

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    nid:state.auth.userid
  };
};
export default connect(mapStateToProps)(Attendance);










