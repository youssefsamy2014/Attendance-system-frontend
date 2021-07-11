import React,{useState,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import classes from './ShowCards.css'
import axios from '../../../axios-order'
import { connect } from "react-redux";
import SnackBar from '../../../components/UI/SnackBar/SnackBar'
import * as actions from '../../../store/actions/index'
import {Image}from 'react-bootstrap';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';




const DataGridAttendance =(props)=>{
    const [open, setOpen] = useState(false);
    // const [card, setCard] = useState(false);
    const [error,setError]=useState(props.err)
    const [message,setMessage]=useState('')
    const [rows,setRows]=useState([])
    const [row,setRow]=useState({
name: "",
id:0,
nid: "",
    })
    const columns=[
        {field: 'id', 'hide': 'true',width:90},
        {field: 'nid',headerName: 'National ID' ,width:150,editable: true},
        {field: 'name', headerName: 'Name',width:135,editable: true},
 
       
    ]
    useEffect(() => {
    
        const axiosConfig={headers: {'x-access-token':props.token}};
        axios.get('/usersForCard',axiosConfig)
        .then(response=>
            {
                    setRows(response.data.rows)
                    // setCard(true)
                   setOpen(true);
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
   

const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const faceHandler=(e)=>{
    e.preventDefault()
    props.Showcards(row.nid)
    // errorHandler()
};

const data_set=props.card.map(image=>{
    return ( 
        <Image src={image.image}
         rounded  
         key={image.id}

         />)
   }
  );











return(
    <div className={classes.page} >
<div className={classes.cgrid} >
<DataGrid  
            rows={rows} 
            columns={columns}  
            checkboxSelection 
            loading={rows.length === 0}
            columnBuffer={Number.MAX_SAFE_INTEGER}
            onRowSelected={(params)=>{setRow(params.data)}}/>

</div>
<div className={classes.face}>
    <center>
    {data_set}                                                      
<Button
variant="contained"
color="default"
startIcon={<CloudUploadIcon />}
type="submit"
size="large"
onClick={faceHandler}
>Show his National-ID-Card</Button> 
    </center>
      
</div>


<SnackBar  errors={error} success={message} close={handleClose} open={open}/>


    </div>

);
};
const mapStateToProps = (state) => {
    return {
    token: state.auth.token,
    nid:state.auth.userid,
    card:state.img.images,
    err:state.img.errror
    };
  };


  const mapDispatchToProps = dispatch => {
    return {
      Showcards: (id) =>dispatch(actions.fetchCard(id)),

    };
  };
  
  
  export default connect(
    mapStateToProps,mapDispatchToProps
  )(DataGridAttendance);
  
  


