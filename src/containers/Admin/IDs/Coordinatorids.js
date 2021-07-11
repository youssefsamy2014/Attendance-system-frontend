import React,{useState,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { updateObject, checkValidity } from '../../../shared/utility';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import classes from './Coordinatorids.css'
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input';
import SnackBar from '../../../components/UI/SnackBar/SnackBar';


/*
addId readIds /updateId/<id>  /deleteId/<id>
*/

const Coordinatorids =(props)=>{
  const [rows,setRows]=useState([]) 
  const [open, setOpen] = React.useState(false); 
    const [error,setError]=useState('') 
    const [message,setMessage]=useState('') 
    const [form,setForm]=useState(
        { NationalID: {
             elementType: 'input',
             elementConfig: { 
               type: 'text',
               placeholder: 'Write coordinator id',
               autoComplete:"false"

             },
             value: '',
             validation: {
               required: true,
               minLength: 14,
               maxLength:14,
               isNumeric:true,

             },
             valid: false,
             touched: false},
            
             name: {
              elementType: "input",
              elementConfig: {
                type: "text",
                placeholder: "Write coordinator name",
                autoComplete:"false"
              },
              value:'',
              validation: {
                required: true,
                isText:true,
        
              },
              valid: false,
              touched: false,
            }
             
            });


    
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
            

//coorids

const [row,setRow]=useState({
name: "",
id: 0,
nationalid: "",
})

const columns=[
  {field: 'id', 'hide': 'true',width:90},
  {field: 'nationalid',headerName: 'National-ID' ,width:150,editable: true},
  {field: 'name', headerName: 'Name',width:135,editable: true}]

    useEffect(() => {
        const axiosConfig={headers: {'x-access-token':props.token}};
        axios.get('/readIds',axiosConfig)
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

          })
    },[props]);


const updateid=()=>{
  const axiosConfig={headers: {'x-access-token':props.token}};

  axios.post('/updateId/'+row.nationalid,row,axiosConfig)
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


const Deleteid=()=>{
  const axiosConfig={headers: {'x-access-token':props.token}};
  axios.post('/deleteId/'+row.nationalid,null,axiosConfig)
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


const addCoord=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};
    const payload={
    nationalid:form.NationalID.value,
    name:form.name.value
    }
    axios.post('/addId',payload,axiosConfig)
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


const CoorArray = [];
for (let key in form) {
  CoorArray.push({
    id: key,
    config: form[key]
  });
}

let forms = (
  <form  >
    {CoorArray.map(formElement => (
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
             onClick={addCoord} 
             disabled={!formIsValid}
            >Add NationalID for Coordinator</Button>

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
      onClick={updateid} 
      style={{margin:'7px'}}
      size="large"
      >Update</Button >

  <Button variant="contained" 
      color="secondary" 
      onClick={Deleteid} 
      style={{margin:'7px'}}
      size="large"
      >Delete</Button >
  {forms}
</div>
<SnackBar  errors={error} success={message} close={handleClose} open={open}/>
  </div>

);
};
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
  
    };
  };
  export default connect(mapStateToProps)(Coordinatorids);
  
