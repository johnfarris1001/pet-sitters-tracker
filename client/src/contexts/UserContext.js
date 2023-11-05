import React from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const testUser = { username: "Test User" };

    return (
        <UserContext.Provider value={testUser}>{children}</UserContext.Provider>
    );
}

export { UserContext, UserProvider };
