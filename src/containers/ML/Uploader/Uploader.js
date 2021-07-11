import React ,{useState}from 'react';
import classes from './Uploader.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'



const Uploader =(props)=>{
  const [valid,setValid]=useState(true)
const[state,setState]=useState({selectedFile:null,
    loaded: 0
})

const  onChangeHandler = (e) => {
  setValid(false)

        setState({
            selectedFile: e.target.files[0],
            loaded: 0
        });
    };




const  handleSubmit = (e) => {
        e.preventDefault();
        const file = state.selectedFile,
        reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        const payload={"video":b64}
        const id =props.fid
        props.onImages(id,payload)};
    };


return (
    <div>
<form  onSubmit={handleSubmit}>
<div className={classes.button_wrap}>
  <label className ={classes.new_button} htmlFor="upload"> Upload Video</label>
  <input id='upload' type="file" onChange={onChangeHandler}  />
</div>

<TextField  type="text" name="facultyid" 
      id="id" value={props.fid} label="Faculty ID" variant="outlined"size="small" disabled hidden/>
    <Button
        variant="outlined"
        color="default"
        startIcon={<CloudUploadIcon />}
        type="submit"
        size="large"
        disabled={valid}
        style={{marginLeft:'1px'}}>Upload</Button>                                                             
        <br/>
    </form>
    </div>        
);};
const mapStateToProps = state => {
    return {
      error: state.img.error,
    images:state.img.images,
    ut:state.auth.usertype,
    fid:state.auth.studentid,
    nm:state.auth.name
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onImages: (id,payload) =>dispatch(actions.fetchImage(id,payload)),
    };
  };
  
  
  export default connect(
    mapStateToProps,mapDispatchToProps
  )(Uploader);
  