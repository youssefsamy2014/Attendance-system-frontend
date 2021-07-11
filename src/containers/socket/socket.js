import React ,{useEffect}from 'react';
import io from "socket.io-client";

let endpoint ='http://127.0.0.1:5000/'

let socket =io.connect(`${endpoint}`);


const TestSocketIo =()=>{
 
    useEffect(() => {
        runStream();
    })



    const runStream=()=>{
            socket.on('stream',vid=>{
                // let byteArray = new Uint8Array(vid);
                console.log(vid)
                const img = document.getElementById( 'img' );
                img.src =vid
               })
    }


       
        return(
            <div style={{position:'absolute',top:'10%',left:'10%'}}>
                <button onClick={()=>(socket.emit('stream','open'))}>open cam</button>
                <button onClick={()=>{
                    socket.emit('end_stream')
                    socket.disconnect()}}>close cam</button>
                <img id='img' alt=''  width="400px" height="400px"/>   
            </div>
        )

}


export default TestSocketIo;

