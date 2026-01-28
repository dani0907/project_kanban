import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Layout(){
  return(<>
  <Header></Header>
  <div id="mainContainer">
    <Outlet></Outlet>
  </div>
  <Footer></Footer>
  </>)
}
export default Layout;