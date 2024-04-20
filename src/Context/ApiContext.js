import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();
const API = "https://api.techdeveloper.in";
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [type, setType] = useState("");
  const [access, setAccess] = useState(false);
  const [name, setName] = useState("");

  const login = (userdata) => {
    localStorage.setItem("isAuthenticated", true);
    console.warn(userdata);
    localStorage.setItem("userinfo", JSON.stringify(userdata));
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userinfo");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      setIsAuthenticated(true);
    }
    const userinfoString = localStorage.getItem("userinfo");
    if (userinfoString) {
      const userinfoObject = JSON.parse(userinfoString);
      setUserInfo(userinfoObject);
    }
  }, []);
  useEffect(() => {
    
    if (userinfo) {
      setType(userinfo.type);
      setAccess(userinfo.access_delete);
      setName(userinfo.name);
    }
  }, [userinfo]);

  return (
    <ApiContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        API,
        setUserInfo,
        userinfo,
        type,
        name,
        access,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
