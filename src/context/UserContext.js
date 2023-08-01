import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Usercontext = createContext();

export const UserState = () => useContext(Usercontext);

const UserProvider = (props) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  }, []);

  const [User, setUser] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const [Search, setSearch] = useState("");
  return (
    <Usercontext.Provider
      value={{ User, setUser, fetchAgain, setFetchAgain, setSearch, Search }}
    >
      {props.children}
    </Usercontext.Provider>
  );
};

export default UserProvider;
