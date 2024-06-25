import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export let TokenContext = createContext();
export function TokenProvider({ children }) {
  // manipulating user token
  let [token, setToken] = useState(null);

  // Reading User Data From Token
  let userData = null

  if (token !== null) {
    userData = jwtDecode(token)
  }


  return (
    <TokenContext.Provider value={{ token, setToken, userData }}>
      {children}
    </TokenContext.Provider>
  );
}
