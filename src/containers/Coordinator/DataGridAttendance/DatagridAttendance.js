import React,{useState,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import classes from './DatagridAttendance.css'
import axios from '../../../axios-order'
import { connect } from "react-redux";
import SnackBar from '../../../components/UI/SnackBar/SnackBar'
import * as actions from '../../../store/actions/index'
import {Image}from 'react-bootstrap';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';




const DataGridAttendance =(props)=>{
    const [open, setOpen] = React.useState(false);
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const [rows,setRows]=useState([])
    const [row,setRow]=useState({
        course: "",
        date: "",
        inout: "",
        name: "",
        facultyid: "",
        id: 0,
                })
    const columns=[
        {field: 'id', 'hide': 'true',width:90},
        {field: 'facultyid', headerName: 'F-ID',width:130, editable: true},
        {field: 'name', headerName: 'Name',width:135, editable: true},
        {field: 'time',headerName: 'Time',width:180 , editable: true},
        {field: 'inout',headerName: 'InOut',width:130, editable: true},
        {field: 'date',headerName: 'Date',width:120, editable: true},
        {field: 'course',headerName: 'Course',width:150, editable: true},
       
    ]
    useEffect(() => {
        // props.deleteImg()
        const axiosConfig={headers: {'x-access-token':props.token}};
        axios.get('/getAttendance/'+props.nid,axiosConfig)
        .then(response=>
            {
                    setRows(response.data.rows)
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
            })    },[props]);
   
const updateData=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};

    axios.post('/RecordUpdate/'+row.facultyid,row,axiosConfig)
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


const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
const DeleteRecord=()=>{
    const axiosConfig={headers: {'x-access-token':props.token}};
    axios.post('/recordDelete/'+row.facultyid,null,axiosConfig)
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
const faceHandler=(e)=>{
    e.preventDefault()
    props.ShowFaces(row.facultyid)
};

const data_set=props.face.map(image=>{
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
    
    <div className={classes.grid}>

<DataGrid  
            rows={rows} 
            columns={columns}  
            checkboxSelection 
            loading={rows.length === 0}
            columnBuffer={Number.MAX_SAFE_INTEGER}
            onRowSelected={(params)=>{setRow(params.data)}}/>
     </div>

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
</div>
{/* <div className={classes.btns}>

</div> */}

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
>Show his face</Button> 
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
    face:state.img.images,
    // error:state.
    };
  };


  const mapDispatchToProps = dispatch => {
    return {
      ShowFaces: (id) =>dispatch(actions.fetchFace(id)),
    //   deleteImg: () =>dispactch(actions.deletes()),
    };
  };
  
  
  export default connect(
    mapStateToProps,mapDispatchToProps
  )(DataGridAttendance);
  
  


