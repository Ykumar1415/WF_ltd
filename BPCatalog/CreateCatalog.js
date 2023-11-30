import React, { useEffect, useState } from 'react'
import useUserStore from '../Store/store';
import { APIWrapper, getHead } from '../Components/APIWrapper';
import "./createCatalog.css";
import Item from "./ItemList.js";
import Overlay from "./DataOverlay";
import Overlay1 from './DataOverlay1';
import Overlaycrx from './Overlaycrx';
import Overlaycrx1 from './Overlaycrx1.js';
function CreateCatalog() {
  const { setChannelCount, setSubChannelCount, setDistTypeCount, setZoneCount, setStateCount, setRegionCount, setCityCount } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isWaiting1, setIsWaiting1] = useState(false);
  const [isWaiting2, setIsWaiting2] = useState(false);

  const [isWaiting3, setIsWaiting3] = useState(false);
  const [isWaiting4, setIsWaiting4] = useState(false);
  const [isWaiting5, setIsWaiting5] = useState(false);
  const [isWaiting6, setIsWaiting6] = useState(false);
  const [isWaiting7, setIsWaiting7] = useState(false);
  const [isWaiting8, setIsWaiting8] = useState(false);
  const [isWaiting9, setIsWaiting9] = useState(false);
  const [isWaiting10, setIsWaiting10] = useState(false);
  const [toggleOverlayx, setToggleOverlayx] = useState(false);
  const [toggleOverlayx1, setToggleOverlayx1] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };
  const changeOverlayTgl = () => {
    setToggleOverlayx(!toggleOverlayx);
  }
  const changeOverlayTgl1 = () => {
    setToggleOverlayx1(!toggleOverlayx1);
  }
  const toggleOverlay1 = () => {
    setIsOpen1(!isOpen1);
  };


  // handling all stuffs related to date

  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const handleFrom = (e) => {
    console.log(e);
    const originalDate = new Date(e.target.value);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(originalDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${ month } -${ day }`;
    console.log(" from date", formattedDate)
    setFrom(formattedDate);
  }
  const handleTo = (e) => {
    const originalDate = new Date(e.target.value);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(originalDate.getDate()).padStart(2, '0');
    const formattedDate = `${ year }-${ month } -${ day }`;
    console.log("to date", formattedDate)
    setTo(formattedDate);
  }

  // handling all stuffs related to short and long desciption
  const [shortdesc, setShortdesc] = useState();
  const [longdesc, setLongdesc] = useState();

  const handleDesc = (e) => {
    console.log(e.target.value);
    if (e.target.name == "input1") {
      setShortdesc(e.target.value);
    }
    else if (e.target.name == "input2") {
      setLongdesc(e.target.value);
    }
  }
  // data from store of selected options
  // the usestate variable will contain all the options for each option
  // the store variable will contain the selected options
  const { channels, subchannels, dist, zone, states, region, city, brand, pack, productfamily, productline, date, selectedDistributors, selectedSku } = useUserStore();


  // handling all stuffs related to saving the catalog

  const [finalmsg, setFinalmsg] = useState("");
  const [savestatus, setSavestatus] = useState(false);

  const handleSave = async () => {
    const token = getHead();
    console.log(token);
    const username = localStorage.getItem("username");
    // const channels1 = channels.map(str => '${str}').join(',');
    const channels1 = channels.join(',');
    const subchannels1 = subchannels.join(',');
    const dist1 = dist.join(',');
    const zone1 = zone.join(',');
    const states1 = states.join(',');
    const region1 = region.join(',');
    const city1 = city.join(',');
    const brand1 = brand.join(',');
    const pack1 = pack.join(',');
    const productfamily1 = productfamily.join(',');
    const productline1 = productline.join(',');
    // console.log(selectedDistributors.length());
    selectedDistributors.map((e) => {
      console.log(e);
    })
    const data1 = selectedDistributors.map((e) => {
      return (

        { "customer_code": e.customer_code }
      )
    });
    console.log(data1);
    const dataItem1 = selectedSku.map((e) => {
      return (
        { "item_code": e.item_code }
      )
    })
    console.log(dataItem1);
    const reqdata = {
      "created_uid": username,
      "template_short_desc": shortdesc,
      "template_detail_desc": longdesc,
      "period_from": from,
      "period_to": to,
      "client_key": token.Authorization,
      "selected_props": [
        {
          "channel": channels1
        },
        {
          "sub_channel": subchannels1
        },
        {
          "dist_type": dist1
        },
        {
          "zone": zone1
        },
        {
          "state": states1
        },
        {
          "region": region1
        },
        {
          "city": city1
        },
        {
          "brand": brand1
        },
        {
          "pack_type": pack1
        },
        {
          "product_family": productfamily1
        },
        {
          "product_line": productline1
        }
      ],
      "data": data1,
      "dataItem": dataItem1
    }
    console.log(reqdata);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: reqdata,
      path: "createCatalog/saveTemplate",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    //     add_message
    // : 
    // "Please make a note of the BPC Entry No"
    // error_code
    // : 
    // "0"
    // error_message
    // : 
    // "success"
    // message
    // : 
    // "BPC Entry Saved Successfully"
    // v_bpc_entry_no
    // : 
    // "BPC2300035"
    if (response.status == "Success") {
      console.log(response.data);
      setFinalmsg(`Your BPC Entry Number is ${ response.data.v_bpc_entry_no }`);
      setSavestatus(true);
    }
  }

  // handling all stuffs related to api calls
  // first will contain whether the data for this has been received or not
  // second will contain the data for each

  // states for channel
  const [statechannel, setStatechannel] = useState(false);
  const [channel, setChannel] = useState([]);

  // states forsubchannel
  const [statesubchannel, setStatesubchannel] = useState(false);
  const [subchannel, setSubchannel] = useState([]);

  // states for dist
  const [statedist, setStatedist] = useState(false);
  const [disttype, setDisttype] = useState([]);

  // states for zone
  const [statezone, setStatezone] = useState(false);
  const [zonetype, setZone] = useState([]);

  // states for state
  const [statestate, setStatestate] = useState(false);
  const [statetype, setState] = useState([]);

  // states for region
  const [regionstate, setRegionstate] = useState(false);
  const [regiontype, setRegiontype] = useState([]);

  // states for city
  const [citystate, setCitystate] = useState(false);
  const [citytype, setCitytype] = useState([]);

  // states for Brand
  const [brandtype, setBrand] = useState([]);

  // states for Pack type
  const [packtype, setPack] = useState([]);

  // states for Product Family
  const [familytype, setFamily] = useState([]);

  // states for Product Line
  const [linetype, setLine] = useState([]);


  const [showDropdown, setShowDropdown] = useState(false);



  const [value, onChange] = useState(new Date());
  const [value1, onChange1] = useState(new Date());


  // API CALL to get channels
  const getChannels = async () => {
    const token = getHead();
    console.log(token);
    let reqParam = {
      headers: token,
      requestType: "GET",
      requestBody: {},
      path: "createCatalog/getChannel",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      console.log(response.data.channel);
      setChannel(response.data.channel);
      setChannelCount(response.data.channel.length);
      setStatechannel(true);
    }
  }
  useEffect(() => {
    getChannels();
  }, []);

  // API CALL to get subchannels
  const getSubchannels = async () => {
    setIsWaiting1(true);
    const token = getHead();
    console.log(token);
    const result1 = channels.map(str => `'${str}'`).join(',');
    console.log(result1);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "channel": result1
      },
      path: "createCatalog/getSubChannel",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      console.log(response.data.sub_channel);
      setSubchannel(response.data.sub_channel);
      setSubChannelCount(response.data.sub_channel.length);
      setStatesubchannel(true);
      console.log(true);
    }
    setIsWaiting1(false);
  }

  // API CALL to get dist type
  const getDist = async () => {
    setIsWaiting2(true);
    const token = getHead();
    console.log(token);
    const result1 = subchannels.map(str => `'${str}'`).join(',');
    console.log(result1);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "sub_channel": result1
      },
      path: "createCatalog/getDistType",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      console.log(response.data.sub_channel);
      setDisttype(response.data.sub_channel);
      setDistTypeCount(response.data.sub_channel.length);
      setStatedist(true);
      console.log(true);
    }
    setIsWaiting2(false);
  }

  const getZone = async () => {
    setIsWaiting3(true);
    const token = getHead();
    console.log(token);
    let reqParam = {
      headers: token,
      requestType: "GET",
      requestBody: {},
      path: "createCatalog/getZone",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setZone(response.data.zone);
      setZoneCount(response.data.zone.length);
      setStatezone(true);
    }
    setIsWaiting3(false);
  }
  const getState = async () => {
    setIsWaiting4(true);
    const token = getHead();
    console.log(token);
    const result1 = zone.map(str => `'${str}'`).join(',');
    console.log(result1);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "zone": result1
        // "zone":"'East','West'"
      },
      path: "createCatalog/getState",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      console.log(response.data.state);
      setState(response.data.state);
      setStateCount(response.data.state.length);
      setStatestate(true);
    }
    setIsWaiting4(false);
  }

  const getRegion = async () => {
    setIsWaiting5(true);
    const token = getHead();
    console.log(token);
    const result1 = states.map(str => `'${str}'`).join(',');
    console.log(result1);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "state": result1
      },
      path: "createCatalog/getRegion",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setRegiontype(response.data.region);
      setRegionCount(response.data.region.length);
      setRegionstate(true);
    }
    setIsWaiting5(false);
  }
  const getCity = async () => {
    setIsWaiting6(true);
    const token = getHead();
    console.log(token);
    const result1 = zone.map(str => `'${str}'`).join(',');
    console.log(result1);
    const result2 = states.map(str => `'${str}'`).join(',');
    console.log(result2);
    const result3 = region.map(str => `'${str}'`).join(',');
    console.log(result3);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "zone": result1,
        "state": result2,
        "region": result3
      },
      path: "createCatalog/getCity",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setCitytype(response.data.city);
      setCityCount(response.data.city.length);
      setCitystate(true);
    }
    setIsWaiting6(false);
  }
  const getBrand = async () => {
    setIsWaiting7(true);
    const token = getHead();
    console.log(token);
    let reqParam = {
      headers: token,
      requestType: "GET",
      requestBody: {},
      path: "createCatalog/getBrand",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setBrand(response.data.brand);
    }
    setIsWaiting7(false);
  }
  const getPack = async () => {
    setIsWaiting8(true);
    const token = getHead();
    console.log(token);
    let reqParam = {
      headers: token,
      requestType: "GET",
      requestBody: {},
      path: "createCatalog/getPackType",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setPack(response.data.pack_type);
    }
    setIsWaiting8(false);
  }
  const getProductFamily = async () => {
    setIsWaiting9(true);
    const token = getHead();
    console.log(token);
    const result1 = pack.map(str => '${str}').join(',');
    console.log(result1);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "pack_type": result1
      },
      path: "createCatalog/getProductFamily",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setFamily(response.data.product_family);
    }
    setIsWaiting9(false);
  }
  const getProductLine = async () => {
    setIsWaiting10(true);
    const token = getHead();
    console.log(token);
    const result1 = brand.join(',');
    console.log(result1);
    const result2 = pack.map(str => '${str}').join(',');
    console.log(result2);
    const result3 = productfamily.map(str => '${str}').join(',');
    console.log(result3);
    let reqParam = {
      headers: token,
      requestType: "POST",
      requestBody: {
        "brand": result1,
        "pack_type": result2,
        "product_family": result3
      },
      path: "createCatalog/getProductLine",
    };
    let response = await APIWrapper(reqParam);
    console.log(response);
    console.log(response.status);
    if (response.status == "Success") {
      setLine(response.data.product_line);
    }
    setIsWaiting10(false);
  }
  const shimmerui = () => {
    return (
      <div>
        Channel Data is Loading......
      </div>
    )
  }

  return (

    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h3 style={{ color: "orange" }}>CREATE CATALOG</h3>

      {/* code for channels */}
      <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        {
          // statechannel ?
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <button class="button-70" role="button" onClick={() => { setShowDropdown(!showDropdown); }} style={{ width: "15rem" }}>
              Select Channels
              <i class="fa fa-caret-down dropdownIcon" ></i>
            </button>
            {
              // showDropdown &&
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "250px", height: "200px", overflow: "auto" }}>
                  {channel.map((i) => {
                    return (
                      <Item itemName={i} itemId={1} dropdownPart={"1"} />
                    )
                  })}
                  {/* <Item itemName="All of the Above" itemId={1} dropdownPart={"1"} /> */}
                </div>
              </div>
            }
          </div>
          //  : shimmerui()
        }
        {/* code for subchannels  */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {
            // channels.length > 0 ? 
            <>

              <button class="button-70" role="button" onClick={getSubchannels} style={{ width: "15rem" }}>

                {isWaiting1 ? "Loading ..." : "Select SubChannels"}
                <i class="fa fa-caret-down dropdownIcon" ></i>
              </button>
            </>
            // : ""

          }
          {
            // statesubchannel ? 

            <div class="multiselect-dropdown" >
              <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                {subchannel.map((i) => {
                  return (
                    <Item itemName={i} itemId={2} dropdownPart={"2"} />
                  )
                })}
              </div></div>
            //  : ""
          }
        </div>
        {/* code for dist type */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {
            // subchannels.length > 0 ?
            <>

              <button class="button-70" role="button" onClick={getDist} style={{ width: "15rem" }}>

                {isWaiting2 ? "Loading ..." : "Select Dist Type"}
                <i class="fa fa-caret-down dropdownIcon" ></i>
              </button>
            </>
            // : ""
          }
          {
            // statedist ? 

            <div class="multiselect-dropdown" >
              <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                {disttype.map((i) => {
                  return (
                    <Item itemName={i.dist_type} itemId={2} dropdownPart={"3"} />
                  )
                })}

              </div></div>
            //  : ""
          }
        </div>

      </div>

      {/* first row has ended......................................................... */}
      <br></br>
      <br></br>

      {/* second row started...................................... */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          {/* code for  zone */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              // dist.length > 0 ? 
              <>

                <button class="button-71" role="button" onClick={getZone} style={{ width: "15rem" }}>

                  {isWaiting3 ? "Loading ..." : "Select Zone"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
              // : ""
            }
            {
              // statezone ?
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {zonetype.map((i) => {
                    return (
                      <Item itemName={i.zone} itemId={2} dropdownPart={"4"} />
                    )
                  })}
                </div></div>
              // : ""
            }
          </div>

          {/* code for state */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              // zone.length > 0 ? 
              <>

                <button class="button-71" role="button" onClick={getState} style={{ width: "15rem" }}>

                  {isWaiting4 ? "Loading ..." : "Select State"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
              // : ""
            }
            {
              // statestate ?
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {statetype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"5"} />
                    )
                  })}
                </div></div>
              // : ""
            }
          </div>
        </div>
        {/* 2nd row part 2 started............................................. */}
        <div style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          {/* code for  region */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              // states.length > 0 ? 
              <>

                <button class="button-71" role="button" onClick={getRegion} style={{ width: "15rem" }}>

                  {isWaiting5 ? "Loading ..." : "Select Region"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
              // : ""
            }
            {
              // regionstate ? 
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {regiontype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"6"} />
                    )
                  })}
                </div></div>
              //  : ""
            }
          </div>

          {/* code for city */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              // region.length > 0 ? 
              <>

                <button class="button-71" role="button" onClick={getCity} style={{ width: "15rem" }}>

                  {isWaiting6 ? "Loading ..." : "Select City"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
              //  : ""
            }
            {
              // citystate ? 

              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {citytype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"7"} />
                    )
                  })}
                </div></div>
              // : ""
            }
          </div>
        </div>
      </div>
      {/* 2nd row ended............................................................................. */}
      {
        // city.length > 0 ?
        <>
          <div class="my-btn-class" style={{ display: "flex", width: "30rem", marginTop: "10px", justifyContent: "space-between" }}>
            <button class="button-5" role="button" onClick={() => { setIsOpen(!isOpen) }} disabled={city.length === 0}>
              Show Distributors
            </button>
            <button class="button-5" role="button" onClick={() => { setIsOpen1(!isOpen1) }} disabled={city.length === 0}>
              Get Distributors
            </button>
          </div>
          {city.length > 0 ? <Overlay isOpen={isOpen} onClose={toggleOverlay}>
          </Overlay> : ""}
          {city.length > 0 ? <Overlay1 isOpen={isOpen1} onClose={toggleOverlay1}>
          </Overlay1> : ""}


        </>
        // : ""
      }
      <br></br>
      <br></br>

      {/* sku section started */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          {/* code for  Brand */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              <>

                <button class="button-71" role="button" onClick={getBrand} style={{ width: "15rem" }}>

                  {isWaiting7 ? "Loading ..." : "Select Brand"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
            }
            {
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {brandtype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"8"} />
                    )
                  })}
                </div></div>
            }
          </div>

          {/* code for Pack Type */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              <>

                <button class="button-71" role="button" onClick={getPack} style={{ width: "15rem" }}>

                  {isWaiting8 ? "Loading ..." : "Select Pack Type"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
            }
            {
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {packtype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"9"} />
                    )
                  })}
                </div></div>
            }
          </div>
        </div>

        <div style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          {/* code for  Product Family */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              <>

                <button class="button-71" role="button" onClick={getProductFamily} style={{ width: "15rem" }}>

                  {isWaiting9 ? "Loading ..." : "Select Product Family"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
            }
            {
              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {familytype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"10"} />
                    )
                  })}
                </div></div>

            }
          </div>

          {/* code for ProductLine */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
              <>

                <button class="button-71" role="button" onClick={getProductLine} style={{ width: "15rem" }}>

                  {isWaiting10 ? "Loading ..." : "Select Product Line"}
                  <i class="fa fa-caret-down dropdownIcon" ></i>
                </button>
              </>
            }
            {

              <div class="multiselect-dropdown" >
                <div class="dropdown" style={{ border: "1px solid", width: "300px", height: "200px", overflow: "auto" }}>
                  {linetype.map((i) => {
                    return (
                      <Item itemName={i} itemId={2} dropdownPart={"11"} />
                    )
                  })}
                </div></div>
            }
          </div>
        </div>
      </div>
      {/* sku section ended */}
      <br />
      <br />

      <>

        {/* isko  shi krna h................ */}
        <div class="my-btn-class" style={{ display: "flex", width: "30rem", marginTop: "10px", justifyContent: "space-between" }}>
          <button class="button-5" role="button" onClick={() => { setToggleOverlayx(!toggleOverlayx) }} disabled={productline.length === 0}>
            Show SKU
          </button>
          <button class="button-5" role="button" onClick={() => { setToggleOverlayx1(!toggleOverlayx1) }}>
            Get SKU
          </button>
        </div>
        {productline.length > 0 && toggleOverlayx ? <Overlaycrx isOpen={toggleOverlayx} onClose={changeOverlayTgl}>
        </Overlaycrx> : ""}
        {productline.length > 0 && toggleOverlayx1 ? <Overlaycrx1 isOpen={toggleOverlayx1} onClose={changeOverlayTgl1}>
        </Overlaycrx1> : ""}

      </>

      <br />
      <br />
      {/* calendar part */}
      <div style={{ display: 'flex', flexDirection: 'row', width: "30rem", gap: "10px", justifyContent: "space-between" }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {console.log(date)}
          <input type="date" value={from} min={date} onChange={handleFrom}></input>
          <h6>Select From Date</h6>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="date" value={to} min={from} onChange={handleTo}></input>
          <h6>Select To Date</h6>
        </div>
      </div>
      <br />
      <div style={{ display: 'flex', flexDirection: 'row', gap: "100px", width: "80%", justifyContent: "center" }}>
        <textarea type="text" maxlength="100" style={{ width: "40%", height: "200px" }} name="input1" placeholder='Short Description(100 Characters)' onChange={handleDesc}></textarea>
        <textarea type="text" maxlength="500" style={{ width: "40%", height: "200px" }} name="input2" placeholder='Detailed Description(500 Characters)' onChange={handleDesc}></textarea>
      </div>
      <br />
      <br />



      <div class="my-btn-class" style={{ display: "flex", width: "30rem", marginTop: "10px", justifyContent: "center" }}>
        <button class="button-5" role="button" onClick={handleSave}>
          Save Catalog
        </button>
      </div>

      <br />
      {savestatus ?
        <>
          <p>{finalmsg}</p>
          <p>Kindly take a note of this</p>
        </> : ""}
      <br />

    </div>
  )
}

export default CreateCatalog