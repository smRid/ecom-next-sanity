import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/productDetails/SingleProduct";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";

const router = createBrowserRouter([ 
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <Home/>},
            {path: "categories/:categoryName", element: <CategoryPage />},
            {path: "search", element: <Search/>},
            {path: "shop", element: <ShopPage/>},
            {path: "shop/:id", element: <SingleProduct/>},
            {path: "about", element: <About/>},
            {path: "contact", element: <Contact/>},
        ]
    }
    
])

export default router;