import { ConversionImpressionLogType } from "../types/conversionAndimpressionLogs.type";
import { UserAllInfoObjType } from "../types/userAllInfoObj.type";
import { UserConversionInfoType } from "../types/userConversion.type";
import { UserMetadataype } from "../types/userMetadataType";
import Card from "./card";
import "./css/card.css";
import "./css/user.css";

const SortByName= (props:any) => {
    const userData: {[id: number]: UserAllInfoObjType} = props.userData;
    const userConversionData: UserConversionInfoType = props.userConversionData;
    const sortedKeys: number[][] = [];
    for(let i=0; i<27; i++) {
      sortedKeys[i] = [];
    }
    Object.keys(userData).map((key,_)=> {
        return sortedKeys[userData[key].name.toLowerCase()[0].charCodeAt()-97].push(parseInt(key));
    });

    return (
        <div id="user">
            <>
            {
        sortedKeys.map((sortedNamedLists) => {
            return sortedNamedLists.map((key) => {
                const sortedNamedUser = userData[key];
                const userId = key;
                const user: UserMetadataype = {
                  impression: sortedNamedUser["impression"],
                  conversion: sortedNamedUser["conversion"],
                  name: sortedNamedUser["name"],
                  avatar: sortedNamedUser["avatar"],
                  occupation: sortedNamedUser["occupation"],
                  revenue: sortedNamedUser["revenue"],
                  time: sortedNamedUser["time"],
                  userId: userId.toString(),
                };
                
                let userConversionCompleteData: ConversionImpressionLogType[] = userConversionData[userId.toString()];
                  
                 return (<Card key={userId}  user={{...user}} 
                    userConversionData={{...userConversionCompleteData}}
                    />)
            })
        })
    };
    </>
        </div>
    );
};
        
  export default SortByName;