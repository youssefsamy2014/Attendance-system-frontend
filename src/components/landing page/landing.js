// import react from 'react';
import classes from './landing.css';
import vi from '../../assets/videos/back.mp4';
import vi2 from '../../assets/vid2.mp4';

import vide from '../../assets/videos/vid2.mp4';
const Landing =()=>{
    return(
        <div className={classes.page}>

            <video  autoPlay  muted className={classes.vid}>
            <source src={vi}type="video/mp4"/>
            </video>


            <div className={classes.hi}></div>
            <div className={classes.hi1}></div>

       
            <div className={classes.intro}>
                <div className={classes.he}>Attendance system using IoT-framework</div>
                <div className={classes.text}>Our Mission is to create a framework that helps everyone.</div>
            </div>

            <video  autoPlay  muted className={classes.vid2}>
            <source src={vi2}type="video/mp4"/>
            </video>
            <div className={classes.cards}>

            <div className={classes.cardi}>
                <div className={classes.videoo}>
                <video  autoPlay className={classes.videoo} muted loop ><source src={vide}type="video/mp4"/></video>

                </div>  
                <div  className={classes.title}> Title</div>
            <div  className={classes.topic}> this is pragraphe for introduciton page</div>
            </div>

            <div className={classes.cardi}>
                <div className={classes.videoo}>
                <video  autoPlay className={classes.videoo} muted loop ><source src={vide}type="video/mp4"/></video>

                </div>  
                <div  className={classes.title}> Title</div>
            <div  className={classes.topic}> this is pragraphe for introduciton page</div>
            </div>

            <div className={classes.cardi}>
                <div className={classes.videoo}>
                <video  autoPlay className={classes.videoo} muted loop ><source src={vide}type="video/mp4"/></video>

                </div>  
            <div  className={classes.title}> Title</div>
            <div  className={classes.topic}> this is pragraphe for introduciton page</div>
            </div>
            </div>

            <div className={classes.footer}>


            <div className={classes.about}>
                <div className={classes.text2}>About</div>
                <hr/>
                <div className={classes.text1}>Every organization whether it be an educational organization or business organization needs thin-client intelligent systems like IoT systems. Which in turn allows the ability to store operations, calculations, and data for a very long time on a server, and that opens the way for business intelligence systems presents a history of actions and reports from a long time.
                So we are using this framework for building a smart attendance system using face recognition and QR codes. 
                This system would improve the accuracy of attendance records because it will remove all the hassles of roll calling and will save valuable time for the students as well as teachers. We can use this web service quickly and easily for building other IoT systems.
                </div>
            </div>


            </div>


        </div>
    );
};

export default Landing;