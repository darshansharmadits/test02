import { ConversionImpressionLogType } from "../types/conversionAndimpressionLogs.type";
import userLogList from "../metadata/logs.json";
import data from "../metadata/users.json";
import { UserConversionInfoType } from "../types/userConversion.type";
import { UserType } from "../types/userType";
import { UserMetadataype } from "../types/userMetadataType";
// import { UserMetadataype } from "../types/userMetadataType";

let userLogs: ConversionImpressionLogType[] = userLogList as any;
let usersList: UserType[] = data as any;

export function convertMetauserDataToUserData() {
    let userData: { [id: number]: UserMetadataype } = {};
    for (let i = 0; i < (userLogs).length; i++) {
        let log: ConversionImpressionLogType = userLogs[i];
        userData[log.user_id] = {
            impression: 0,
            conversion: 0,
            revenue: 0,
            avatar: "n/a",
            name: "User",
            occupation: "human",
            time: "",
            userId: log.user_id.toString()
        }
    }
    for (let i = 0; i < (userLogs).length; i++) {
        let log: ConversionImpressionLogType = userLogs[i];
        if (userData[log.user_id] !== undefined) {
            if (log.type === "impression") {
                userData[log.user_id].impression += 1;
            }
            if (log.type === "conversion") {
                userData[log.user_id.toString()].conversion += 1;
            }
            userData[log.user_id.toString()].revenue += log.revenue;
        }
    }

    for (let i = 0; i < (usersList).length; i++) {
        let user: UserType = usersList[i];
        if (userData[user.id] !== undefined) {
            userData[user.id].avatar = user.avatar;
            userData[user.id].occupation = user.occupation
            userData[user.id].name = user.name;
        }
    }
    return Object.entries(userData).slice(0,20).map(entry => entry[1]);
}

export function getConversionsByUserId() {

    let userConversionsData: UserConversionInfoType = {};
    for (let i = 0; i < (userLogs).length; i++) {
        let log: ConversionImpressionLogType = userLogs[i];
        userConversionsData[log.user_id] = {}
    }
    for (let i = 0; i < (userLogs).length; i++) {
        let log: ConversionImpressionLogType = userLogs[i];
        userConversionsData[log.user_id][log.time] = {
            conversion: 0,
            impression: 0
        };
    }

    for (let i = 0; i < (userLogs).length; i++) {
        let log: ConversionImpressionLogType = userLogs[i];

        if (log.type === "impression") {
            userConversionsData[log.user_id][log.time].impression += 1;
        }

        if (log.type === "conversion") {
            userConversionsData[log.user_id][log.time].conversion += 1;
        }
    }

    return { ...userConversionsData };
}