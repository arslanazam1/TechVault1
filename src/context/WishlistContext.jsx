import { createContext, useContext, useEffect, useState } from "react";
const WishlistContext = createContext(null);
export function WishlistProvider({children}) {
 const [wishlist,setWishlist] = useState(()=>{try{return JSON.parse(localStorage.getItem("techvault-wishlist"))||[];}catch{return[];}});
 useEffect(()=>{try{localStorage.setItem("techvault-wishlist",JSON.stringify(wishlist));}catch{}},[wishlist]);
 const toggle = (id) => setWishlist(old => old.includes(id) ? old.filter(x=>x!==id) : [...old,id]);
 return <WishlistContext.Provider value={{wishlist,toggle}}>{children}</WishlistContext.Provider>;
}
export const useWishlist = () => useContext(WishlistContext);