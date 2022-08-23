import userLogList from "../metadata/logs.json";
import data from "../metadata/users.json";
// import { UserMetadataype } from "../types/userMetadataType";


export function convertMetauserDataTouserData() {
    let userData: any = {};
    for (let i = 0; i < (userLogList as any).length; i++) {

        if (typeof userData[(userLogList as any)[i]["user_id"]] != 'object') {
            userData[(userLogList as any)[i]["user_id"]] = {
                impression: 0,
                conversion: 0,
                revenue: 0,
                time: (userLogList as any)[i]["time"],
            };
        }
        if ((userLogList as any)[i]["type"] === "impression") {
            userData[(userLogList as any)[i]["user_id"]].impression += 1;
        }
        if ((userLogList as any)[i]["type"] === "conversion") {
            userData[(userLogList as any)[i]["user_id"]].conversion += 1;
        }
        userData[(userLogList as any)[i]["user_id"]].revenue += (userLogList as any)[i]["revenue"];
    }

    for (let i = 0; i < (data as any).length; i++) {

        if (typeof userData[(data as any)[i]["id"]] == 'object') {

            userData[(data as any)[i]["id"]].avatar = (data as any)[i]['avatar'];
            userData[(data as any)[i]["id"]].occupation = (data as any)[i]['occupation'];
            userData[(data as any)[i]["id"]].name = (data as any)[i]['name'];
        }
        else {
            userData[(data as any)[i]["id"]] = {
                impression: 0,
                conversion: 0,
                revenue: 0,
                avatar: userData[(data as any)[i]['avatar']],
                occupation: userData[(data as any)[i]['occupation']],
                name: userData[(data as any)[i]['name']],
                time: "N/A"
            };
        }

    }

    return userData;
}


export function getConversionsByUserId() {
    let userConversionsData: any = {};
    for (let i = 0; i < (userLogList as any).length; i++) {
        if (typeof userConversionsData[(userLogList as any)[i]["user_id"]] != 'object') {
            userConversionsData[(userLogList as any)[i]["user_id"]] = [{
                conversion: 0,
                revenue: 0,
                time: (userLogList as any)[i]["time"],
            }];
        }
        userConversionsData[(userLogList as any)[i]["user_id"]].push({
            conversion: (userLogList as any)[i]["conversion"],
            revenue: (userLogList as any)[i]["revenue"],
            time: (userLogList as any)[i]["time"],
        });
    }
    return userConversionsData;
}