import { useEffect, useState } from "react";
import { convertMetauserDataToUserData, getConversionsByUserId } from "../converters/converter";
import { UserAllInfoObjType } from "../types/userAllInfoObj.type";
import { UserConversionInfoType } from "../types/userConversion.type";
import SortByName from "./sortByName";
import SortById from "./sortById";
import CustomLoader from "../../widgets/loader";
import { UserContext } from "../context/user.context";

const User = (props:any) => {
    const [userData, setUserData] = useState({} as {[id: number]: UserAllInfoObjType});
    const [sortBy, setSortBy] = useState(props.sortCardsBy || "userid");
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
      <div>
        <div>
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
              <UserContext.Provider value={{ userPageloader, setUserPageLoader }} >
                { renderUserCardsBy(sortBy) }
              </UserContext.Provider>
            }
      </div>
    );
    }

export default User;