import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout=()=>{
    return(
   <main>
    <Header/> 
    <Outlet/>
   </main>
    )
}
export default Layout;