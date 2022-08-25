import Card from "./card";
import "./css/card.css";
import "./css/user.css";
import { useState } from "react";
import { convertMetauserDataToUserData, getConversionsByUserId } from "../converters/converter";
import { UserMetadataype } from "../types/userMetadataType";
import { UserAllInfoObjType } from "../types/userAllInfoObj.type";
import { ConversionInfoByUserType, UserConversionInfoType } from "../types/userConversion.type";



// function returnSorted(sortBy, userInfo) {
//   if (sortBy === 'name') {

//   }
// }


function User() {

    const [userData, setUserData] = useState({} as {[id: number]: UserAllInfoObjType});
    const [sortBy, setSortBy] = useState('id');

    const [userConversionData, setUserConversionData] = useState({} as UserConversionInfoType);
    if (Object.keys(userData).length === 0) {
      (async () => {
        setUserData(await convertMetauserDataToUserData()); 
      })();
    }

    if (Object.keys(userConversionData).length === 0) {
      (async () => {
        setUserConversionData(await getConversionsByUserId());
      })();
    }
 
    return ( 
      <div id="user"> 
     {
      
      Object.keys(userData).map((key, index) => {
        let user:UserMetadataype = {
              impression: userData[key]["impression"],
              conversion: userData[key]["conversion"],
              name: userData[key]["name"],
              avatar: userData[key]["avatar"],
              occupation: userData[key]["occupation"],
              revenue: userData[key]["revenue"],
              time: userData[key]["time"]
        };

        let userConversionCompleteData: ConversionInfoByUserType[] = userConversionData[key];
           return( 
           <Card key={index}  user={{...user}} 
            userConversionData={{...userConversionCompleteData}}
            /> );
        
          } )
        };
      </div>
    );
    }

export default User;