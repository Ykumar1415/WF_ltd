import React, { useEffect, useState } from "react";
import "./Overlay.css";
import DataListShow from "./DataListShow";
import useUserStore from '../Store/store';
export function Overlay({ isOpen, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isloading, setIsloading] = useState(true);
    const { channels, subchannels, dist, zone, states, region, city } = useUserStore();
    const [customers, setCustomers] = useState([]);
    const [selectedCodes, setSelectedCodes] = useState([]);

    // convert array to string of form "'a','b','c'"
    let channel = channels.map((i) => `'${i}'`).join(",");
    let sub_channel = subchannels.map((i) => `'${i}'`).join(",");
    let dist_type = dist.map((i) => `'${i}'`).join(",");
    let zone1 = zone.map((i) => `'${i}'`).join(",");
    let state = states.map((i) => `'${i}'`).join(",");
    let region1 = region.map((i) => `'${i}'`).join(",");
    let city1 = city.map((i) => `'${i}'`).join(",");
    let channelCount = channels.length;
    let subChannelCount = subchannels.length;
    let distCount = dist.length;
    let zoneCount = zone.length;
    let stateCount = states.length;
    let regionCount = region.length;
    let cityCount = city.length;


    const { channel_count, sub_channel_count, dist_type_count, zone_count, state_count, region_count, city_count } = useUserStore();
    if (channels.length === channel_count || channels.length === 0) {
        channel = "0";
        channelCount = 0;
    }
    if (subchannels.length === sub_channel_count) {
        sub_channel = "0";
        subChannelCount = 0;
    }
    if (dist.length === dist_type_count) {
        dist_type = "0";
        distCount = 0;
    }
    if (zone.length === zone_count) {
        zone1 = "0";
        zoneCount = 0;
    }
    if (states.length === state_count) {
        state = "0";
        stateCount = 0;
    }
    if (region.length === region_count) {
        region1 = "0";
        regionCount = 0;
    }
    if (city.length === city_count) {
        city1 = "0";
        cityCount = 0;
    }
    // console.log("favorite part",{ channel, sub_channel, dist_type, zone1, state, region1, city1 });
    const { selectedDistributors } = useUserStore();
    useEffect(() => {
        const getCustomers = async () => {
            const response = await fetch("http://192.168.0.8:5004/intranet_app_api_v2/createCatalog/getSelectedDBs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                },
                body: JSON.stringify({
                    "channel_count": channelCount,
                    "sub_channel_count": subChannelCount,
                    "dist_type_count": distCount,
                    "zone_count": zoneCount,
                    "state_count": stateCount,
                    "region_count": regionCount,
                    "city_count": cityCount,
                    "channel": channel,
                    "sub_channel": sub_channel,
                    "dist_type": dist_type,
                    "zone": zone1,
                    "state": state,
                    "region": region1,
                    "city": city1
                })
            });

            const data = await response.json();
            setCustomers(data.data.distributor_details);
            // console.log("new Request is made overlay",data.data.distributor_details);
                        setIsloading(false);
        };

        if (selectedDistributors.length === 0) getCustomers();
    }, []);


    const totalItems = customers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const handleCheckboxChange = (code) => {
        if (selectedCodes.includes(code)) {
            setSelectedCodes(selectedCodes.filter((c) => c !== code));
            console.log(selectedCodes);
        } else {
            setSelectedCodes([...selectedCodes, code]);
            console.log(selectedCodes);
        }
    };
    const setCurrentPagevalue = (value) => {
        setCurrentPage(value);
    }
    return (
        <div>
            {isOpen && (
                <div className="overlay">
                    <div className="overlay__background" onClick={onClose} />
                    <div className="overlay__container" style={{ overflow: "auto" }}>
                        <div className="overlay__controls">
                            <button
                                className="overlay__close"
                                type="button"
                                onClick={onClose}
                            />
                        </div>
                        <div style={{ width: "1300px", height: "600px", display: "flex", flexDirection: "column", paddingLeft: "2rem", paddingRight: "2rem" }}>
                            <h2 style={{ width: "100%", height: "45px" }}>Show Distributors</h2>
                            {/* First Part */}
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Channel : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{(channels.length === 0 || channels.length === undefined) ? "None" :((channel === "0") ? "All":channel)}</p> */}
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{(channel === "0") ? "All": channel}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", resize: "none", border: "none", outline: "none", backgroundColor: "transparent" }} rows="3" cols="35" value={(channel === "0") ? "All" : channel} readOnly></textarea>

                                </div>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Sub Channel : </h6>
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", resize: "none", border: "none", outline: "none", backgroundColor: "transparent" }} rows="3" cols="35" value={(sub_channel === "0") ? "All" : sub_channel} readOnly ></textarea>
                                </div>

                            </div>

                            {/* Second Type */}
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Dist Type : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{(dist_type === "0") ? "All":dist_type}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", resize: "none", border: "none", outline: "none", backgroundColor: "transparent" }} rows="3" cols="35" value={(dist_type === "0") ? "All" : dist_type} readOnly></textarea>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Zone : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{(zone1 === "0") ? "All":zone1}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", resize: "none", border: "none", outline: "none", backgroundColor: "transparent" }} rows="3" cols="35" value={(zone1 === "0") ? "All" : zone1} readOnly></textarea>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "5px" }}>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>State : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{(state === "0") ? "All":state}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", resize: "none", border: "none", outline: "none", backgroundColor: "transparent" }} rows="3" cols="50" value={(state === "0") ? "All" : state} readOnly></textarea>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Region : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{(region1 === "0") ? "All":region1}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", resize: "none", border: "none", outline: "none", backgroundColor: "transparent" }} rows="3" cols="50" value={(region1 === "0") ? "All" : region1} readOnly></textarea>
                                </div>
                            </div>
                            
                            <div style={{ display: "flex", flexDirection: "row", rowGap: "8px", justifyContent: "space-between", marginTop: "5px" }}>

                            </div>


                            {/* last Part Grid */}

                            <div style={{ diaplay: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <h5>Customer List</h5>
                                {(isloading) ? (<p>Data is Loading...</p>) : <DataListShow
                                    customers={customers}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    itemsPerPage={itemsPerPage}
                                    selectedCodes={selectedCodes}
                                    totalPages={totalPages}
                                    onCheckboxChange={handleCheckboxChange}
                                />

                                }
                                {/* Pagination controls... */}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Overlay;