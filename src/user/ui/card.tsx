import React, { useEffect, useRef, useState } from "react";
import './css/card.css';
import { UserMetadataype } from "../types/userMetadataType";
import { ConversionInfoByUserType } from "../types/userConversion.type";
import Chart from "chart.js/auto";
import { ChartConfiguration } from "chart.js";
import CustomLoader from "../../widgets/loader";

function Card(props:any) {
    const user: UserMetadataype = props.user;
    const userConversionInfo: ConversionInfoByUserType = props.userConversionData;
    
    // const yAxis = [Object.keys(userConversionInfo).map((key, index) => index+10)]
    let conversionCounter = 0;
    let impressionCounter = 0;    
    // const userContext:{userPageLoader: boolean, setUserPageLoader:(val:boolean)=>void} = useContext(UserContext);
    
    const [userImageErrorFlag, setUserImageErrorFlag] = useState(false);
    const [graphLoader, setGraphLoader] = useState(true);
    const [userAvatarLoader, setUserAvatarLoader] = useState(true);
    const xAxis = useRef([Object.keys(userConversionInfo).map((key, _) => key)]);
    const points = useRef([Object.keys(userConversionInfo).map((key, _) =>{
      conversionCounter += userConversionInfo[key].conversion;
      impressionCounter += userConversionInfo[key].impression;
      return Math.floor((conversionCounter/impressionCounter) * 100);
    })]);
    //@ts-ignore
    // userContext.setUserPageLoader(false);
    useEffect(()=> {
      const data = {
        labels: xAxis.current[0],
        datasets: [{
          label: 'Conversions',
          backgroundColor: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`,
          data: points.current[0],
        }]
      };
    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        scales: {
          y : {
            beginAtZero: true,
            display: false
          },
          x: {
            display: false,
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
      }   
    };
      const canvasForChart: HTMLCanvasElement = document.getElementById('chart-' + user.userId) as HTMLCanvasElement;
      const ctx = canvasForChart!.getContext('2d')!;
      new Chart(ctx,config);
      setGraphLoader(false);
      // userContext.setUserPageLoader(false);
    }, [user.userId]);


      return (
      <div>
        <div id='main-column-user-card'>
            <div id="user-pic-name-row">
                <div id="user-avatar" style={{backgroundColor: `rgb(${Math.random()*(255 - 0) + 100},${Math.random()*(255 - 0) + 100},${Math.random()*(255 - 0) + 100})`}}>
                {userAvatarLoader ? <CustomLoader /> : <></> } 
                {
                 userImageErrorFlag ? <h3>{user.name[0]}</h3> : 
                    <img alt="user-img" src={user.avatar} onError={() => {
                        setUserImageErrorFlag(true);
                        setUserAvatarLoader(false);
                    }} onLoad={() => {
                      setUserAvatarLoader(false);
                    }}/>
                } 
                </div>
                <div id="user-info">
                    <div id="user-name">{user.name.length < 21 ? user.name + " ".repeat(21-user.name.length) : user.name}</div>
                    <div id="user-job">
                      {user.occupation.length < 40 ? user.occupation + " ".repeat(40-user.occupation.length) : user.occupation}
                      </div>
                    <div id="empty-div-user-info"></div>
                </div>
            </div>
            <div id="user-logs-graph-row">
            
              <div id="user-log-graph-menu">
                <div id="graph">
                {
                    graphLoader ? 
                    <CustomLoader width={"30px"}/>
                    : <></>
                  }
                  <canvas hidden={graphLoader} id={"chart-" + user.userId}>
                  </canvas>
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