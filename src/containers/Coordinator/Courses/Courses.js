import React,{useState,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import classes from './Courses.css'
import axios from '../../../axios-order'
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import SnackBar from '../../../components/UI/SnackBar/SnackBar'
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';


const Cour =(props)=>{
    const [open, setOpen] =useState(false);
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const [rows,setRows]=useState([])
    const [row,setRow]=useState({
        id: 0,
        coursecode: "",
        coursename: "",
       
                })
    const [form,setForm]=useState(
       { coursecode: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Write Course Code'
            },
            value: '',
            validation: {
              required: true,
              minLength: 5,
              maxLength:7

            },
            valid: false,
            touched: false
          },
          coursename: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Write Course Name'
            },
            value: '',
            validation: {
              required: true,
              minLength: 4
            },
            valid: true,
            touched: true
          }
        }
    )

    

    useEffect(() => {
        const axiosConfig={headers: {'x-access-token':props.token}};
        axios.get('/readCourse/'+props.nid,axiosConfig)
        .then(response=>
            { 
            setRows(response.data.rows)
            setOpen(true)
            setError(null)
            setMessage('Fetch data done')
           
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
        
            const columns=[
                {field: 'id', 'hide': 'true',width:90},
                {field: 'coursecode', headerName: 'Course_Code',width:130, editable: true},
                {field: 'coursename', headerName: 'Course_Name',width:250, editable: true},
                
               
            ]




const addCourse=(e)=>{
    e.preventDefault();

    const axiosConfig={headers: {'x-access-token':props.token}};
    const payload={
        "coursecode":form.coursecode.value,
        "coursename":form.coursename.value,
        "nid":props.nid
        }    
    axios.post('/addCourse',payload,axiosConfig)
    .then(response=>
        { 
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
        })
};


const updateData=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};

    axios.post('/updateCourse/'+row.coursecode,row,axiosConfig)
    .then(response=>
        { 
            setOpen(true);
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
        })
};






const DeleteRecord=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};
    axios.post('/deleteCourse/'+row.coursecode,null,axiosConfig)
    .then(response=>
        {  
            setOpen(true);
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

        })

};
  
const CoursesArray = [];
for (let key in form) {
  CoursesArray.push({
    id: key,
    config: form[key]
  });
}

let forms = (
  <form  >
    {CoursesArray.map(formElement => (
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
            <Button  variant="contained" 
             color="default" 
             style={{margin:'7px'}}
             size="large"
             disabled={!formIsValid}
             onClick={addCourse} 
            >Add Course</Button>

  </form>
);

const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
return(
<div className={classes.grid} >
<DataGrid  
            rows={rows} 
            columns={columns}  
            checkboxSelection 
            loading={rows.length === 0}
            columnBuffer={Number.MAX_SAFE_INTEGER}
            onRowSelected={(params)=>{setRow(params.data)}}

  />
  
  <Button variant="contained" 
      color="primary" 
      onClick={updateData} 
      style={{margin:'7px'}}
      size="large"
      >Update</Button >

      <Button variant="contained" 
      color="secondary" 
      onClick={DeleteRecord} 
      style={{margin:'7px'}}
      size="large"
      >Delete</Button >
      <SnackBar  errors={error} success={message} close={handleClose} open={open}/>
    <div className={classes.login}  >
    {forms}
</div>
</div>

);
};
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
      nid:state.auth.userid
    };
  };
  export default connect(mapStateToProps)(Cour);
  


