// children is everyting that <Layout> wraps
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <div className="content">
            <Navbar/>
            { children }
            <Footer/>
        </div>
    );
}

export default Layout;