import React, { useState } from "react";
import GraphImg from "../../assets/images/graph.png";
import './css/card.css';
import { UserMetadataype } from "../types/userMetadataType";
// import { Chart } from 'chart.js';

// type MyDatum = { date: Date, stars: number }


function Card(props:any) {
    const user: UserMetadataype = props.user;
    // const userConversionInfo = props.userConversionData;
    const [userImageErrorFlag, setUserImageErrorFlag] = useState(false);
    // var xyValues = [
    //   {x:50, y:7},
    //   {x:60, y:8},
    //   {x:70, y:8},
    //   {x:80, y:9},
    //   {x:90, y:9},
    //   {x:100, y:9},
    //   {x:110, y:10},
    //   {x:120, y:11},
    //   {x:130, y:14},
    //   {x:140, y:14},
    //   {x:150, y:15}
    // ];
    // new Chart("myChart", {
    //   type: "scatter",
    //   data: {
    //     datasets: [{
    //       pointRadius: 4,
    //       pointBackgroundColor: "rgb(0,0,255)",
    //       data: xyValues
    //     }]
    //   },
    //   options: {
    //     legend: {display: false},
    //     scales: {
    //       xAxes: [{ticks: {min: 40, max:160}}],
    //       yAxes: [{ticks: {min: 6, max:16}}],
    //     }
    //   }
    // });
      return (
      <div>
        <div id='main-column-user-card'>
            <div id="user-pic-name-row">
                <div id="user-avatar" style={{backgroundColor: `rgb(${Math.random()*(255 - 0) + 100},${Math.random()*(255 - 0) + 100},${Math.random()*(255 - 0) + 100})`}}>
                { userImageErrorFlag ? <h3>{user.name[0]}</h3> : 
                    <img src={user.avatar} alt={user.id + "-image"} onError={() => {
                        setUserImageErrorFlag(true);
                    }} />
                     
                }  
                </div>
                <div id="user-info">
                    <div id="user-name">{user.name}</div>
                    <div id="user-job">{user.occupation}</div>
                    <div id="empty-div-user-info"></div>
                </div>
            </div>
            <div id="user-logs-graph-row">
            
              <div id="user-log-graph-menu">
                <div id="graph">
                {/* <canvas id="myChart"></canvas> */}
                <img src={GraphImg} alt="graph" />
                </div>
                <div id="conversion-info">
                  <p>Conversions 4/12 - 4/30</p>
                </div>
              </div>
              <div id="user-impression-info">
                <div>{user.impression.toString()}<p>impressions</p></div>
                <div>{user.conversion.toString()}<p>conversions</p></div>
                <div>${user.revenue.toFixed(3).toString()}</div>
              </div>
            </div>
        </div>
      </div>
    );
  }

export default Card;