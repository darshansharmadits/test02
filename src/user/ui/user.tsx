import { useEffect, useState } from "react";
import { convertMetauserDataToUserData, getConversionsByUserId } from "../converters/converter";
import { UserAllInfoObjType } from "../types/userAllInfoObj.type";
import { UserConversionInfoType } from "../types/userConversion.type";
import SortByName from "./sortByName";
import SortById from "./sortById";
import CustomLoader from "../../widgets/loader";

const User = (props:any) => {
    const [userData, setUserData] = useState({} as {[id: number]: UserAllInfoObjType});
    const sortUsersBy: string = props.sortBy;
    const [sortBy, setSortBy] = useState(sortUsersBy || "userid");
    const [userPageloader, setUserPageLoader] = useState(false);

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
    function renderUserCardsBy(val: string) {
      switch(val){
        case 'username':
          return <SortByName userData={{...userData}} userConversionData={{...userConversionData}} ></SortByName>
        case 'userid':
          return <SortById userData={{...userData}} userConversionData={{...userConversionData}} ></SortById>
        default:
          return <SortById userData={{...userData}} userConversionData={{...userConversionData}} ></SortById>
      }
    }
    useEffect(() => {
      setUserPageLoader(false);
    }, [userPageloader])
    
    
    return (
      <div id="user-cards">
        <div id="sortby-section">
        <input checked={sortBy === "userid"} type="radio" id="sortbyid" name="sortby" value="userid" onChange={event => {
          setUserPageLoader(true);
          setSortBy(event?.target.value);
          }} />&nbsp;
        <label htmlFor="sortbyid">Sort By: Id</label>
        <br />
        <input checked={sortBy === "username"} type="radio" id="sortbyname" name="sortby" value="username" onChange={event => {
          setUserPageLoader(true);
          setSortBy(event?.target.value)
          }}/>&nbsp;
          <label htmlFor="sortbyname">Sort By: Name</label>
        <br />
        <br />
        </div> 
            {
              userPageloader ? <CustomLoader width={"100px"}></CustomLoader> : 
                renderUserCardsBy(sortBy) 
            }
      </div>
    );
    }

export default User;