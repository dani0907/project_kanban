import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Layout(){
  return(<>
  <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
    <Header></Header>
      <Outlet></Outlet>
    <Footer></Footer>
  </div>
  </>)
}
export default Layout;