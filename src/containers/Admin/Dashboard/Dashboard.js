import React, { useState,useEffect } from 'react';
import classes from './Dashboard.css';
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {Line} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { connect } from "react-redux";// eslint-disable-next-line
import axios from '../../../axios-order'
import SnackBar from '../../../components/UI/SnackBar/SnackBar';


const DashBoard =(props)=>{// eslint-disable-next-line
  const [open, setOpen] = React.useState(false); // eslint-disable-next-line
  const [error,setError]=useState('') // eslint-disable-next-line
  const [message,setMessage]=useState('')   // eslint-disable-next-line
  const [labels,setLabels]=useState([]);// eslint-disable-next-line
  const [data,setData]=useState([]);// eslint-disable-next-line
  const  [lastItem,setL] = useState([]);// eslint-disable-next-line
  const [all_attend,setA]=useState([])// eslint-disable-next-line
  useEffect(() => {// eslint-disable-next-line
    const axiosConfig={headers: {'x-access-token':props.token}};
  // eslint-disable-next-line
    axios.get('/staticticsOfAttendance',axiosConfig)
    .then(response=>// eslint-disable-next-line
        { 
// eslint-disable-next-line
        setLabels(response.data[0].labels);// eslint-disable-next-line
        setData(response.data[1].data);// eslint-disable-next-line
        setL(response.data[2].attendanceToday);// eslint-disable-next-line
        setA(response.data[3].students);// eslint-disable-next-line

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
                  
          }) // eslint-disable-next-line
      },[]);

      

    const state ={
      labels:labels,
      datasets: [
        {
          label: 'Attendance',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data:data
        }
      ]
    }


    const handleClose = ( reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    
const state2={
    labels: labels,
    datasets: [
      {
        label: 'Attendance',
        backgroundColor: [
         
          '#00A6B4',
        ],
        hoverBackgroundColor: [
      
        '#003350',
        ],
        data: data
      }
    ]
  }
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return(<div className={classes.dashboard}>
        <div className={classes.flexContainer}>


        <div className={classes.lbox} style={{order: '1'}}>
            
        <div className={classes.sbox} style={{order: '1',backgroundColor:'#197ED8'}}><AccessibilityNewOutlinedIcon style={{ fontSize: 50,color:' white' ,margin:'20px'}}/>
            </div>
            <div className={classes.header} style={{order: '2'}}>
                Students
            </div>
            <div className={classes.num} style={{order: '3'}}>
                {all_attend}
            </div>

           
        
        </div>




        <div className={classes.lbox} style={{order: '2'}}>
            
            <div className={classes.sbox}style={{order: '1',backgroundColor:'#8320A6'}}><CalendarTodayIcon style={{ fontSize: 50,color:' white'  ,margin:'20px'}}/></div>
        
            <div className={classes.header} style={{order: '2'}}>
                Date
            </div>
            <div className={classes.num} style={{order: '3'}}>
                {date}
            </div>


        </div>


        <div className={classes.lbox} style={{order: '3'}}>
            
            <div className={classes.sbox}style={{order: '1',backgroundColor:'#F68201'}}><AssignmentTurnedInIcon style={{ fontSize: 50,color:' white'  ,margin:'20px'}}/></div>
            

            <div className={classes.header} style={{order: '2'}}>
                Attendance Today
            </div>
            <div className={classes.num} style={{order: '3'}}>
                {lastItem}
            </div>

            
            </div>
      

        </div >
            <div className={classes.chartsContainer}>

            <div className={classes.Chart} style={{order: '1'}}>
            <Line
            style={{marginTop:'50px'}}
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Attendance per month',
              fontSize:10
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
            </div>
            <div className={classes.Chart} style={{order: '2'}}>
            <Bar 
            style={{marginTop:'50px'}}

          data={state2}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20,


            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
            </div>

            </div>


            <SnackBar  errors={error} success={message} close={handleClose} open={open}/>


    </div>);
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,

  };
};
export default connect(mapStateToProps)(DashBoard);

