import React,{useState,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import classes from './Datagrid.css'
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import SnackBar from '../../../components/UI/SnackBar/SnackBar';
import axios from '../../../axios-order'



const DataGrids =(props)=>{
    const [rows,setRows]=useState([])
    const [open, setOpen] = useState(false);
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const [row,setRow]=useState({
        dept: "",
email: "",
faculty: "",
facultyid: "",
firstname: "",
id: 0,
lastname: "",
nationalid: "",
    })
    const columns=[
        {field: 'id', 'hide': 'true',width:90},
        {field: 'nationalid',headerName: 'National ID' ,width:150,editable: true},
        {field: 'firstname', headerName: 'FName',width:135,editable: true},
        {field: 'lastname', headerName: 'LName',width:135,editable: true},
        {field: 'email',headerName: 'E-mail',width:180,editable: true },
        {field: 'facultyid', headerName: 'F-ID',width:130,editable: true},
        {field: 'faculty',headerName: 'Faculty',width:130,editable: true},
        {field: 'dept',headerName: 'Dept',width:120,editable: true},
       
    ]
    useEffect(() => {
        const axiosConfig={headers: {'x-access-token':props.token}};

        axios.get('/user',axiosConfig)
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
  
const updateData=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};

    axios.post('/userUpdate/'+row.nationalid,row,axiosConfig)
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

  
const DeleteRecord=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};
    axios.post('/userDelete/'+row.nationalid,null,axiosConfig)
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

</div>
);
};
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
  
    };
  };
  export default connect(mapStateToProps)(DataGrids);
  
