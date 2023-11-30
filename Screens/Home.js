import React,{useEffect, useState} from "react";
import "../Stylesheets/dashboard.css";
import homeImage from "../Images/item_home.jpg";
import useUserStore from "../Store/store";
import { APIWrapper, getHead } from "../Components/APIWrapper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Home=()=>
{       
    const [item,setItem] = useState(false);
    const [bp,setBp] = useState(false);
    const {setDate} = useUserStore();
    const setrole = useUserStore((state)=>state.setRoles);
    const Bp = useUserStore((state)=>state.setBp);    
    const Item = useUserStore((state)=>state.setItem);
    const getUserRole = async () => {
        const token  = getHead();
        console.log(token);
        let reqParam = {
          headers: token,
          requestType: "GET",
          requestBody: {},
          path: "dashboard/getDashboardDetails",
        };
        let response = await APIWrapper(reqParam);
        console.log(response);
        console.log(response.status);
        if (response.status == "Success") {
          
          setDate(response.data.profile_details.sys_date);
          const details = response.data.menu_details;
          details.map(async(item)=>{
            console.log(item.menu_display_name);
            // BP Catalogue Item Master Creation
            if(item.menu_display_name=="BP Catalogue") setBp(true); await Bp(true);
            if(item.menu_display_name=="Item Master Creation") setItem(true);  await Item(true);
          })
          await setrole(response.data.menu_details);
          // localStorage.setItem("RoleId", response["data"].role_id);
          // localStorage.setItem("RoleDesc", response["data"].role_desc);
    
        }
      };     
    useEffect(()=>{
         getUserRole();
    },[]);
    const udata = useUserStore((state)=>state.roles);
    console.log(udata);
    const shimmerui = () => {
      return(
        <div>
            Your Data is Loading......
        </div>
      )
    }
    return (
    <>
        <h5 className="dashboardContent">Welcome to home page</h5>
        {!item && !bp ? shimmerui():""}
        <div style={{display:"flex",width:"100%",justifyContent:"space-around",marginTop:"3rem",textAlign:"center"}}>
            {item?<Link to ="dashboard/item"style={{width:"500px",height:"10px",backgroundColor:"red",paddingTop:"2.5rem", color:"white", height:"8rem",textDecoration: 'none',borderRadius:"1rem"}}>ITEM1</Link>:""}
            {bp?<Link to ="dashboard/bpcatalog" style={{width:"500px",height:"10px",backgroundColor:"green",paddingTop:"2.5rem",color:"white", height:"8rem",textDecoration: 'none',borderRadius:"1rem"}}>B.P. Catalog</Link>:""} 
        </div>
        
        {/* <img src={homeImage} alt="BigCo Inc. logo" className="homeImage"/> */}
        
    </>
    );
}

export default Home;