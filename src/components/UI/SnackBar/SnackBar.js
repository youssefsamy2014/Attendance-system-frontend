import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const SnackBar =(props)=>{
    let snacks=null;

        if (!props.errors&&props.success){
            snacks=(<Snackbar open={props.open} autoHideDuration={60000} onClose={props.close} >
                <Alert severity="success">{props.success}</Alert>
                </Snackbar>
    ); 
        }
        else if(props.errors&&!props.success){
            snacks=(   <Snackbar open={props.open} autoHideDuration={60000} onClose={props.close} >
        <Alert severity="error">{props.errors}</Alert>
        </Snackbar>);

        };


    return(
        <div>
        {snacks}

        </div>
    );
};


export default SnackBar;