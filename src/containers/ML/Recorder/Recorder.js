import React,{useState,useEffect} from 'react';
import Uploader from '../Uploader/Uploader'
import classes from './Recorder.css'
import VideoRecorder from 'react-video-recorder'// eslint-disable-next-line 
// import {Button} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import {ListGroup } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import Modals from '../../../components/UI/modal/modal'
import RecipeReviewCard from '../../Profile/Cards/Cards'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import Aux from '../../../hoc/Auxi/Auxi';
import SnackBar from '../../../components/UI/SnackBar/SnackBar'


const Recorder = (props) => {

  const [valid,setValid]=useState(true)
   const [recordedChunks, setRecordedChunks] = useState([]);
   const [modalShow, setModalShow] =useState(false);
   const [open, setOpen] = useState(false);

   useEffect(() => {
    if(props.error==="Network Error"){setModalShow(true)}
  },[props])


  const submitHandler =() => {
    const file = recordedChunks,
    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
    const b64 = reader.result.replace(/^data:.+;base64,/, '');
    const payload={"video":b64}
    const id =props.fid
    props.onImages(id,payload)};
      }


      const handleClose = ( reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    


 const data_set=props.images.map(image=>{
  return ( <img className={classes.img}
  alt={image.id}
      key={image.id}
      src={image.image} 
      />)
 }
);
let firstChars = props.nm.charAt(0) 

const tips=(
<div>
<p>This is instruction you <span style={{color:'red' }}>MUST DO IT... </span></p>
<ListGroup>
<ListGroup.Item>You should click on 'Turn my camera on'</ListGroup.Item>
<ListGroup.Item>Record Your video</ListGroup.Item>
<ListGroup.Item>Then Click on Save Your Video</ListGroup.Item>
<ListGroup.Item>OR another way 'Upload Video'</ListGroup.Item>
<ListGroup.Item>Then Click on Upload</ListGroup.Item>
<ListGroup.Item>You done if you show your photo</ListGroup.Item>
</ListGroup>
</div>
)

  return (
    <div className={classes.container}>
<div className={classes.info}>
  <div className={classes.card}>
  <RecipeReviewCard firstChar={firstChars} namee={props.nm} nidd={props.nid} cont={props.fid}/>

  </div>
<div className={classes.photo}>
{data_set}
</div> 
</div>




      
      <div className={classes.rec}>
<div className={classes.camcon}>
<VideoRecorder timeLimit={3000}
      onRecordingComplete={videoBlob => {
      setValid(false)
      setRecordedChunks(videoBlob)}}/>
</div>


       <TextField  type="text" name="facultyid" 
      id="id" value={props.fid} label="Faculty ID" variant="outlined"size="small" disabled hidden/>

      <Button variant="contained"
        color="default"
      onClick={submitHandler} 
      style={{width:'100%'}}
      disabled={valid}
      size="lg">Save Your Video</Button >
      </div>
   



<div className={classes.uploader}><Uploader/>
<br/>
<Button variant="contained"
        color="secondary" onClick={() => setModalShow(true)} focus>
       <LabelImportantIcon/> Click me! to show steps
        </Button>
</div>


{props.error==="Network Error"?<Modals show={modalShow}onHide={() => setModalShow(false)}bodyy={props.error}/>:
<Aux>
<Modals show={modalShow}onHide={() => setModalShow(false)}bodyy={tips}/>
<SnackBar  errors={props.error} success={null} close={handleClose} open={open}/>
</Aux>
}
    </div> 
  );
};
const mapStateToProps = state => {
  return {
    error: state.img.error,
    images:state.img.images,
    ut:state.auth.usertype,
    fid:state.auth.studentid,
    nm:state.auth.name,
    nid:state.auth.userid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onImages: (id,payload) =>dispatch(actions.fetchImage(id,payload)),
  };
};


export default connect(
  mapStateToProps,mapDispatchToProps
)(Recorder);
