import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
export default function Navbar() {
 const [query,setQuery]=useState(""); const [dark,setDark]=useState(()=>localStorage.getItem("techvault-theme")==="dark");
 const {totalItems}=useCart(); const {user,logout}=useAuth(); const {wishlist}=useWishlist(); const navigate=useNavigate();
 function toggleTheme(){const next=!dark;setDark(next);document.body.classList.toggle("dark-theme",next);localStorage.setItem("techvault-theme",next?"dark":"light");}
 function search(e){e.preventDefault();navigate(`/products${query.trim()?`?search=${encodeURIComponent(query.trim())}`:""}`);}
 return <header className="site-header">
  <Link to="/" className="brand"><span className="brand-icon">▱</span><span><strong>Tech<span>Vault</span></strong><small>Premium Laptop Store</small></span></Link>
  <nav className="main-nav"><NavLink to="/" end>Home</NavLink><NavLink to="/products">Products⌄</NavLink><NavLink to="/categories">Categories</NavLink><NavLink to="/about">About</NavLink><NavLink to="/contact">Contact</NavLink></nav>
  <form className="search-box" onSubmit={search}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search laptops..." aria-label="Search products"/><button aria-label="Search">⌕</button></form>
  <div className="header-actions"><button onClick={toggleTheme} title="Toggle theme">{dark?"☀":"☼"}</button>{user?<button title="Log out" onClick={()=>{logout();navigate("/");}}>⇥</button>:<Link title="Login" to="/login">♙</Link>}<Link title="Wishlist" to="/wishlist">♡<sup>{wishlist.length}</sup></Link><Link title="Cart" to="/cart">🛒<sup>{totalItems}</sup></Link></div>
 </header>;
}