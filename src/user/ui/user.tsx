import Card from "./card";
import "./css/card.css";
import "./css/user.css";
import { useState } from "react";
import { convertMetauserDataTouserData, getConversionsByUserId } from "../converters/converter";
import { UserMetadataype } from "../types/userMetadataType";
import { UserAllInfoObjType } from "../types/userAllInfoObj.type";
import { UserConversionInfoType } from "../types/userConversion.type";


function User() {

    const [userData, setUserData] = useState({} as {[key: string]: UserAllInfoObjType});

    const [userConversionData, setUserConversionData] = useState({} as {[key: string]: UserConversionInfoType});
    if (Object.keys(userData).length === 0)
    (async () => {
      setUserData(await convertMetauserDataTouserData()); 
      setUserConversionData(await getConversionsByUserId());
    })();
    return ( 
      <div id="user"> 
     {
      
      Object.keys(userData).map((key, index) => {

        const data: UserMetadataype = userData[key] as UserAllInfoObjType;
        let user:UserMetadataype = {
              id: parseInt(key),
              impression: data["impression"],
              conversion: data["conversion"],
              name: data["name"],
              avatar: data["avatar"],
              occupation: data["occupation"],
              revenue: data["revenue"],
              time: data["time"]
        };

        let userConversionCompleteData: UserConversionInfoType = userConversionData[key];
        
           return( <Card key={index}  user={{...user}} userConversionData={userConversionCompleteData} /> );
        
          } )
        };
     
        
      </div>
    );
    }

export default User;