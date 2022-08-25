import usersDataJson from "../../user/metadata/users.json";
import userLogsJson from "../../user/metadata/logs.json";
import Card from "../../user/ui/card";

const mockGetUserDataFunction = jest.fn().mockImplementation(() => {
    return {
        1: {
        name: "test user 01",
        occupation: "test occupation",
        avatar: "test-avatar",
        impression: 0,
        conversion: 0,
        revenue: 0,
        time: "test-time"
    },2: {
        name: "test user 02",
        occupation: "test occupation-02",
        avatar: "test-avatar-02",
        impression: 0,
        conversion: 0,
        revenue: 0,
        time: "test-time"
    }
}});

const mockGetUserConversions = jest.fn().mockImplementation(() => {
    return {
        1: {
        "2013-04-01": {
            impressions: 0,
            conversions: 0,
        },
        "2013-04-02": {
            impressions: 0,
            conversions: 1,
        },
    },2: {
        "2013-04-01": {
            impressions: 0,
            conversions: 0,
        },
        "2013-04-02": {
            impressions: 0,
            conversions: 1,
        }
    } 
}}
).mockName("getUserConversionsData");


const userTest = describe('Testing user component', () => {
    it("checking if no user exist", () => {
        expect(Object.keys(mockGetUserDataFunction).length).toBeGreaterThan(0);
    });

    it("checking if user data is valid", () => {
        expect(mockGetUserDataFunction.mock.results[1]).toBeDefined;
    });
    it("testing invalid user ids", () => {
        expect(mockGetUserDataFunction[0]).toBeUndefined;
    });
    it("user conversion data validity test", () => {
        expect(Object.keys(mockGetUserConversions).length).toBeGreaterThan(0);
    });
    it("user conversion for invalid user id", () => {
        expect(mockGetUserConversions.mock.results[0]).toBeUndefined;
    });
});


const jsonImportTests = describe('Testing user data from Json File', () => {
    it("user conversion data validity test", () => {
        expect(usersDataJson.length).toBeGreaterThan(0);
    });
    it("checking type of user data from json", () => {
        expect(typeof usersDataJson).toEqual('object');
    });
    it("checking if their is any data present in logs json", () => {
        expect(userLogsJson.length).toBeGreaterThan(0);
    });
    it("checking type of logs data from json", () => {
        expect(typeof userLogsJson).toEqual('object');
    });
    
});


const userCardTests = describe('Testing user card component', () => {
    const mockUser = {
        name: "test user 01",
        occupation: "test occupation",
        avatar: "test-avatar",
        impression: 0,
        conversion: 0,
        revenue: 0,
        time: "test-time"
    }
    const mockConversionData = {
        1: {
            "2013-04-01": {
                impressions: 0,
                conversions: 0,
            },
            "2013-04-02": {
                impressions: 0,
                conversions: 1,
            },
        },2: {
            "2013-04-01": {
                impressions: 0,
                conversions: 0,
            },
            "2013-04-02": {
                impressions: 0,
                conversions: 1,
            }
        }
    };
    const userCard = <Card user={mockUser} userConversionData={mockConversionData} />
    it("does user card functional component exists", () => {
        expect(typeof Card).toEqual("function");
    });
    it("does user card work on passing props", () => {
        expect(Object.keys(userCard.props).length).toEqual(2);
    });
});

export default {userTest, jsonImportTests, userCardTests};