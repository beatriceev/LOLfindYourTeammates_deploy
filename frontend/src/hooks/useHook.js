import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";
const HookContext = createContext({
  username: "",
  password: "",
  rememberMe: false,
  displayStatus: () => {},
  setUsername: () => {},
  setPassword: () => {},
  setRememberMe: () => {},
});

const HookProvider = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };
  return (
    <HookContext.Provider
      value={{
        username,
        password,
        rememberMe,
        setUsername,
        setPassword,
        setRememberMe,
        displayStatus,
      }}
      {...props}
    />
  );
};

const useHook = () => useContext(HookContext);
export { HookProvider, useHook };
