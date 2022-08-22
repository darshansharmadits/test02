import { useState } from "react";
import { UserType } from "../types/userType";
import GraphImg from "../../assets/images/graph.png";
import './card.css';

function Card(user:any) {
    const [userImageErrorFlag, setUserImageErrorFlag] = useState(false);
    
    return (
      <div>
        <div id='main-column-user-card'>
            <div id="user-pic-name-row">
                <div id="user-avatar">
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
                  <img src={GraphImg} alt="graph" />
                </div>
                <div id="conversion-info">
                  <p>Conversions 4/12 - 4/30</p>
                </div>
              </div>
              <div id="user-impression-info">
                <div>{user.impressions}<p>impressions</p></div>
                <div>{user.conversions}<p>conversions</p></div>
                <div>${user.revenue}</div>
              </div>
            </div>
        </div>
      </div>
    );
  }

export default Card;