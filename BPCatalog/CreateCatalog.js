import React, { useEffect, useState } from 'react'
import useUserStore from '../Store/store';
import { APIWrapper, getHead } from '../Components/APIWrapper';
import "./createCatalog.css";
import Item from "./ItemList.js";
import Overlay from "./DataOverlay";
import Overlay1 from './DataOverlay1';

function CreateCatalog() {
const {setChannelCount,setSubChannelCount,setDistTypeCount,setZoneCount,setStateCount,setRegionCount,setCityCount} = useUserStore();
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



  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };
  const toggleOverlay1 = () => {
    setIsOpen1(!isOpen1);
  };
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


  const [showDropdown, setShowDropdown] = useState(false);

  // data from store of selected options
  // the usestate variable will contain all the options for each option
  // the store variable will contain the selected options
  const { channels, subchannels, dist, zone, states, region, city } = useUserStore();

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
      <div style={{ display: "flex",gap:"10px" }}>
        <div style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",gap:"10px" }}>
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
        <div style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",gap:"10px" }}>
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
            <button class="button-5" role="button" onClick={() => { setIsOpen(!isOpen) }}>
              Show Distributors
            </button>
            <button class="button-5" role="button" onClick={() => { setIsOpen1(!isOpen1) }}>
              Get Distributors
            </button>
          </div>
          <Overlay isOpen={isOpen} onClose={toggleOverlay}>
          </Overlay>
          <Overlay1 isOpen={isOpen1} onClose={toggleOverlay1}>
          </Overlay1>
        </>
        // : ""
      }

    </div>
  )
}

export default CreateCatalog