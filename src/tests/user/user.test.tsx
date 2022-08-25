import { convertMetauserDataToUserData } from "../../user/converters/converter";


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
}}
);



const userTest = describe('Testing user component', () => {
    it("checking if no user exist", () => {
        expect(Object.keys(mockGetUserDataFunction).length).toBeGreaterThan(0);
    });

    it("checking if user data is valid", () => {
        expect(mockGetUserDataFunction[1]).toBeDefined();
    });
    it("Check if user has a valid id", () => {
        expect(mockGetUserDataFunction[0]).toBeUndefined();
    });

    // it("Check if user has a valid id", () => {
    //     const resp = mockGetUserDataFunction();
    // });

});

export default userTest;