import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
const USERS = "techvault-users"; const SESSION = "techvault-session";
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read(SESSION, null));
  function register({name,email,phone,password}) {
    const users = read(USERS, []); const key = email.trim().toLowerCase();
    if (users.some(u => u.email === key)) return {ok:false,error:"An account with this email already exists."};
    users.push({name:name.trim(),email:key,phone:phone.trim(),password}); write(USERS, users); return {ok:true};
  }
  function login({email,password}) {
    const found = read(USERS, []).find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (!found) return {ok:false,error:"Incorrect email or password."};
    const session = {name:found.name,email:found.email,phone:found.phone}; write(SESSION,session); setUser(session); return {ok:true};
  }
  function logout() { try { localStorage.removeItem(SESSION); } catch {} setUser(null); }
  return <AuthContext.Provider value={{user,register,login,logout}}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);