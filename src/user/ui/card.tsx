import React, { useState } from "react";
import './css/card.css';
import { UserMetadataype } from "../types/userMetadataType";
import ApexCharts from 'apexcharts'

function Card(props:any) {
    const user: UserMetadataype = props.user;
    // const userConversionInfo = props.userConversionData;
    const [userImageErrorFlag, setUserImageErrorFlag] = useState(false);
    var options = {
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: "20%"
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
      yaxis: {
        categories: [10,20,40,20,50,60,10,100,20]
      }
    };
    (async ()=>{
      const chart = new ApexCharts(document.querySelector('#chart'), options);
      await chart.render();
     })();
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
                <div id="chart"></div>
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