import React from 'react'
import classes from './Profile.css'
import { connect } from "react-redux";
import RecipeReviewCard from './Cards/Cards'
// import {Avatar}from '@material-ui/core'
const Profile =(props)=>{
  let firstChars = props.nm.charAt(0) 

    return(<div>
      <div className={classes.info}>
 
<RecipeReviewCard firstChar={firstChars} namee={props.nm} nidd={props.nid} cont={props.ut}/>
      </div>


    </div>);
}; 
const mapStateToProps = state => {
    return {
      nm:state.auth.name,
      nid:state.auth.userid,
      ut:state.auth.usertype
    };
  };
  
  
  
  export default connect(
    mapStateToProps
  )(Profile);
  
