import React from "react";
import classes from './f.css';
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';

const Logintbygoogle =()=> {
  



const responseGoogle = (response) => {
  localStorage.setItem('email', response.profileObj.email);
  window.location.reload()
}
const responseFacebook = (response) => {
  localStorage.setItem('email', response.email);
  window.location.reload()

}
    return (
    
<div style={{display:'flex',flexDirection:'row',width:'100%',position:'relative',justifyContent:'center',marginTop:'10px'}}>


<GoogleLogin
             style={{width:'50%',height:'50px'}}
                clientId="718265640241-j4vvrra8iks9icggg39khp7pfr4i8dbd.apps.googleusercontent.com"
                buttonText="Signup with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={false}
                ></GoogleLogin>


<FacebookLogin
    appId="1112224055954098"
    fields="name,email"
    callback={responseFacebook} 
    cssClass={classes.face}
    textButton="Signup with Facebook"
    />


</div>
            

    );
  
}

export default Logintbygoogle;
