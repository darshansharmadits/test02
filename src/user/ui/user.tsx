import Card from "./card";
import userList from "../metadata/users.json";
import userLogList from "../metadata/logs.json";
import { UserType } from "../types/userType";
import { UserLogType } from "../types/userLogType";
import "./card.css";
import { useEffect } from "react";
import convertMetauserDataTouserData from "../converters/converter";

var userData: any;

function User() {
    useEffect(function (){
      userData = convertMetauserDataTouserData();
      console.log(userData[71]);
    }, [0])
    return (
      userData.map(function(user:any){
        return (<Card user={{...user}}/>);
      })
    );
  }

export default User;