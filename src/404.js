import React ,{useState}from 'react'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router';


const P404 =()=>{
    const [open,setOpen]=useState(false);
    return(
        <div>

        
        <div style={{position:'absolute',top:'100px',fontSize:'200px'}}> 
            page not found
            <Button variant="contained"
        color="secondary" onClick={()=>setOpen(true)} >
       <LabelImportantIcon/> Return
        </Button>
        </div>
{open?<Redirect to='/'/>:null}       
 </div>
    );
};

export default P404;