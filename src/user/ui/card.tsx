import React, { useState } from "react";
import './css/card.css';
import { UserMetadataype } from "../types/userMetadataType";
import Chart from "react-apexcharts";
import { ConversionInfoByUserType } from "../types/userConversion.type";

function Card(props:any) {
    const user: UserMetadataype = props.user;
    const userConversionInfo: ConversionInfoByUserType = props.userConversionData;
    const xAxis = [Object.keys(userConversionInfo).map((key, _) => key)];
    const yAxis = [Object.keys(userConversionInfo).map((key, index) => index+10)]
    let conversionCounter = 0;
    let impressionCounter = 0;
    const points = [Object.keys(userConversionInfo).map((key, _) =>{
      conversionCounter += userConversionInfo[key].conversion;
      impressionCounter += userConversionInfo[key].impression;
      return Math.floor((conversionCounter/impressionCounter) * 100);
    })];
    
    const [userImageErrorFlag, setUserImageErrorFlag] = useState(false);

    const data = {
      options: {
        grid: {
          show: false,
        },
        chart: {
          id: "line",
          background: "none",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          categories: [...xAxis[0]],
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          categories: [...yAxis[0]]
        
        },
      },
      series: [
        {
          name: "conversion",
          data: [...points[0]]
        },
      ],
    };
    
      return (
      <div>
        <div id='main-column-user-card'>
            <div id="user-pic-name-row">
                <div id="user-avatar" style={{backgroundColor: `rgb(${Math.random()*(255 - 0) + 100},${Math.random()*(255 - 0) + 100},${Math.random()*(255 - 0) + 100})`}}>
                { userImageErrorFlag ? <h3>{user.name[0]}</h3> : 
                    <img alt="user-img" src={user.avatar} onError={() => {
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
                  {Object.keys(data).length !== 0 ?
                <Chart
                  options={data.options}
                  series={data.series}
                  type="line"
                  width="170" 
              />
               : <div>No Data Recvd</div> 
               } 
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