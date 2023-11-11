import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import CreateItem from "../Screens/CreateItem";
import ViewItem from "../Screens/ViewItem";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import useUserStore from "../Store/store";
import { useRef } from "react";

const Sidebar = (props) => {
  const [isOpen, setOpen] = useState(false);
  // const [item,setItem] = useRef(false);
  // const [bp,setBp] = useRef(false);
  const bp = useUserStore((state) => state.bp);
  const item = useUserStore((state) => state.item);
  // udata.map((item)=>{
  //   console.log(item.menu_display_name);
  // BP Catalogue Item Master Creation
  // if(item.menu_display_name=="BP Catalogue") setBp(true);
  // if(item.menu_display_name=="Item Master Creation") setItem(true);
  // })
  console.log(bp);
  console.log(item);
  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const clickViewItems = () => {
    closeSideBar();
    props.history.push("/viewItem");
  };

  const clickCreateItem = () => {
    closeSideBar();
    props.history.push("/createItem");
    // window.location.reload();
  };

  const clickHome = () => {
    closeSideBar();
    props.history.push("/dashboard");
    // window.location.reload();
  };

  const clickSignOut = () => {

    localStorage.clear();
    window.location.href = '/';
  };

  const showPopUp = (event) => {
    // alert("EVENT");
    // event.preventDefault();
    closeSideBar();
    Swal.fire({
      title: "OOPS!",
      html: "Item creation not allowed for your ID.",
      icon: "Error",
    });
  };
  const [bpCtlg, setShowBpCatalog] = useState(false);
  const [Itemcreatn, setShowItemcreatn] = useState(false);


  return (
    <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>

      <div className="bm-item"><i className="fa fa-home" ></i>
        <a
          style={{ padding: "0px", marginTop: "0px", marginLeft: "10px" }}

          onClick={clickHome}
        >
          Home
        </a>
      </div>
      {/* Item Creation */}
      {item ? (
        <div className="bm-item"><i className="fa fa-file" ></i>
          <a
            style={{ padding: "0px", marginLeft: "10px" }}
            onClick={() => {
              setShowItemcreatn(!Itemcreatn);
            }
            }
          >
            Item
          </a>
          {Itemcreatn && (
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {/* <li>Create Catalog</li> view item */}
              {/* <li>View Catalog</li> create item */}
              <li className="bm-item"><i className="fa fa-binoculars" ></i>
                <a
                  style={{ padding: "0px", marginTop: "0px", marginLeft: "10px" }}

                  onClick={clickViewItems}
                >
                  View items
                </a>
              </li>
              <li className="bm-item"><i className="fa fa-file" ></i>
                <a
                  style={{ padding: "0px", marginLeft: "10px" }}
                  onClick={
                    localStorage.getItem("RoleId") != 0
                      ? (e) => showPopUp(e)
                      : clickCreateItem
                  }
                >
                  Create item
                </a>
              </li>
            </ul>
          )

          }

        </div>
      ) : null}


      {/* End Item Creation */}


      {/* bp catalog dropdown list create, view and edit catalog */}
      {bp ? (
        <div className="bm-item"><i className="fa fa-file" ></i>
          <a
            style={{ padding: "0px", marginLeft: "10px" }}
            onClick={() => {
              setShowBpCatalog(!bpCtlg);
            }
            }
          >
            BP Catalog
          </a>
          {bpCtlg && (
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {/* <li>Create Catalog</li> view item */}
              {/* <li>View Catalog</li> create item */}
              <li className="bm-item"><i className="fa fa-binoculars" ></i>
                <a
                  style={{ padding: "0px", marginTop: "0px", marginLeft: "10px" }}

                  onClick={() => {
                    closeSideBar();
                    props.history.push("/create-BPcatalog");
                  }}
                >
                  Create Catalog
                </a>
              </li>
              <li className="bm-item"><i className="fa fa-file" ></i>
                <a
                  style={{ padding: "0px", marginLeft: "10px" }}
                  onClick={
                    () => {
                      closeSideBar();
                      props.history.push("/view-BPcatalog");
                    }
                  }
                >
                  View Catalog
                </a>
              </li>
              <li className="bm-item"><i className="fa fa-file" ></i>
                <a
                  style={{ padding: "0px", marginLeft: "10px" }}
                  onClick={
                    () => {
                      closeSideBar();
                      props.history.push("/edit-BPcatalog");
                    }
                  }
                >
                  Edit Catalog
                </a>
              </li>
            </ul>
          )

          }

        </div>
      ) : null}
      <div className="bm-item"><i className="fa fa-sign-out" ></i>
        <a
          style={{ padding: "0px", marginTop: "0px", marginLeft: "10px" }}

          onClick={clickSignOut}
        >
          Sign-Out
        </a>
      </div>
    </Menu>
  );
};

export default withRouter(Sidebar);
