import { UserAllInfoObjType } from "../types/userAllInfoObj.type";
import { ConversionInfoByUserType, UserConversionInfoType } from "../types/userConversion.type";
import { UserMetadataype } from "../types/userMetadataType";
import Card from "./card";
import "./css/card.css";
import "./css/user.css";

const SortById= (props:any) => {
    const userData: {[id: number]: UserAllInfoObjType} = props.userData;
    const userConversionData: UserConversionInfoType = props.userConversionData;

    return (
        <div id="user">
            <>
            
    {
        
    Object.keys(userData).map((key, index) => {
        let user: UserMetadataype = {
              impression: userData[key]["impression"],
              conversion: userData[key]["conversion"],
              name: userData[key]["name"],
              avatar: userData[key]["avatar"],
              occupation: userData[key]["occupation"],
              revenue: userData[key]["revenue"],
              time: userData[key]["time"],
              userId: key
        };

        let userConversionCompleteData: ConversionInfoByUserType[] = userConversionData[key];
           return( 
           <Card key={index}  user={{...user}} 
            userConversionData={{...userConversionCompleteData}}
            /> 
            )
          })
        }
        
    </>
    </div>
    );
}
        
  export default SortById;