import { createContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const ApiContext = createContext();
export const AppProvider = ({ children }) => {
  const API = "https://api.thirdeyeworldnews.com";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [type, setType] = useState("");
  const [access, setAccess] = useState(false);
  const [name, setName] = useState("");

  const login = (userdata) => {
    secureLocalStorage.setItem("isAuthenticated", true);
    console.warn(userdata);
    secureLocalStorage.setItem("userinfo", JSON.stringify(userdata));
    setIsAuthenticated(true);
  };
  const logout = () => {
    secureLocalStorage.removeItem("isAuthenticated");
    secureLocalStorage.removeItem("userinfo");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const isAuthenticated = secureLocalStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      setIsAuthenticated(true);
    }
    const userinfoString = secureLocalStorage.getItem("userinfo");
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
