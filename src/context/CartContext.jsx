import { createContext, useContext, useEffect, useReducer } from "react";
const CartContext = createContext(null);
function readCart() { try { return JSON.parse(localStorage.getItem("techvault-cart")) || []; } catch { return []; } }
function reducer(state, action) {
  switch (action.type) {
    case "ADD": { const found = state.find(x => x.id === action.item.id); return found ? state.map(x => x.id === action.item.id ? {...x, qty:x.qty + (action.qty || 1)} : x) : [...state, {...action.item, qty:action.qty || 1}]; }
    case "SET_QTY": return state.map(x => x.id === action.id ? {...x, qty:Math.max(1, Number(action.qty) || 1)} : x);
    case "REMOVE": return state.filter(x => x.id !== action.id);
    case "CLEAR": return [];
    default: return state;
  }
}
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, undefined, readCart);
  useEffect(() => { try { localStorage.setItem("techvault-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return <CartContext.Provider value={{cart, dispatch, totalItems, subtotal}}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);