// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState
// } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({
//   children
// }) => {

//   const [user, setUser] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {

//     const storedUser =
//       localStorage.getItem("user");

//     if (storedUser) {
//       setUser(
//         JSON.parse(storedUser)
//       );
//     }

//     setLoading(false);

//   }, []);

//   const login = (
//     token,
//     userData
//   ) => {

//     localStorage.setItem(
//       "token",
//       token
//     );

//     localStorage.setItem(
//       "user",
//       JSON.stringify(userData)
//     );

//     setUser(userData);
//   };

//   const logout = () => {

//     localStorage.removeItem(
//       "token"
//     );

//     localStorage.removeItem(
//       "user"
//     );

//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () =>
//   useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};