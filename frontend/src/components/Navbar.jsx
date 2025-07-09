import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartModal from "../pages/shop/CartModal";

const Navbar = () => {

    const products = useSelector((state) => state.cart.products)

    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    }


    return (
        <header className="fixed-nav-bar w-nav">
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
                <ul className="nav__links">
                    <li className="link"><Link to="/">Home</Link></li>
                    <li className="link"><Link to="/shop">Shop</Link></li>
                    <li className="link"><Link to="/about">About</Link></li>
                    <li className="link"><Link to="/contact">Contact</Link></li>
                </ul>

                {/* Logo */}
                <div className="nav__logo">
                    <Link to="/"> Marketopia </Link>
                </div>

                {/* Nav Icons */}
                <div className="nav__icons relative">
                    <span>
                        <Link to="/search">
                         <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button 
                            onClick={handleCartToggle} 
                            className="hover:text-primary">
                            <i className="ri-shopping-cart-line"></i>
                            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">{products.length}</sup>
                        </button>
                    </span>
                </div>
            </nav>

            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen}
                onClose={handleCartToggle}
                />
            }

        </header>
    )
}

export default Navbar;