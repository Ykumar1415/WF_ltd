import React, { useEffect, useState } from "react";
import "./Overlay.css";
import DataListShow from "./DataListShow1";
import useUserStore from '../Store/store';
export function Overlay({ isOpen, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isloading, setIsloading] = useState(false);
    const { channels, subchannels, dist, zone, states, region, city,selectedDistributors } = useUserStore();
    const [customers, setCustomers] = useState([]);
    const [selectedCodes, setSelectedCodes] = useState([]);

    // convert array to string of form "'a','b','c'"
    const channel = channels.map((i) => `'${i}'`).join(",");
    const sub_channel = subchannels.map((i) => `'${i}'`).join(",");
    const dist_type = dist.map((i) => `'${i}'`).join(",");
    const zone1 = zone.map((i) => `'${i}'`).join(",");
    const state = states.map((i) => `'${i}'`).join(",");
    const region1 = region.map((i) => `'${i}'`).join(",");
    const city1 = city.map((i) => `'${i}'`).join(",");
   


    
    // useEffect(() => {
    //     const getCustomers = async () => {
    //         const response = await fetch("http://192.168.0.8:5004/intranet_app_api_v2/createCatalog/getSelectedDBs", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bearer " + localStorage.getItem("authToken")
    //             },
    //             body: JSON.stringify({
    //                 "channel_count": 0,
    //                 "sub_channel_count": 0,
    //                 "dist_type_count": 0,
    //                 "zone_count": 0,
    //                 "state_count": 0,
    //                 "region_count": 0,
    //                 "city_count": 0,
    //                 "channel": "0",
    //                 "sub_channel": "0",
    //                 "dist_type": "'DB','SS'",
    //                 "zone": "0",
    //                 "state": "0",
    //                 "region": "0",
    //                 "city": "0"
    //             })
    //         });

    //         const data = await response.json();
    //         setCustomers(data.data.distributor_details);
    //         console.log(data.data.distributor_details);
    //         //   useUserStore().pushStoreDataList(data.data.distributor_details);
    //         //   console.log({ "useUserStore": useUserStore().StoreDataList });
    //         setIsloading(false);
    //     };

    //     getCustomers();
    // }, []);


    const totalItems = customers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
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
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{channel}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={channel} />
                                </div>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Sub Channel : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{sub_channel}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={sub_channel} />
                                </div>

                            </div>

                            {/* Second Type */}
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Dist Type : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{dist_type}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={dist_type} readonly />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Zone : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{zone1}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={zone1} readonly />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>State : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{state}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={state} readonly />
                                </div>

                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Region : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{region1}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={region1} readonly />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>City : </h6>
                                    {/* <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{city1}</p> */}
                                    <textarea style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left", border: "none", outline: "none" }} rows="1" cols="30" value={city1} readonly />
                                </div>
                            </div>
                            {/* Third Type */}
                            <div style={{ display: "flex", flexDirection: "row", rowGap: "8px", justifyContent: "space-between", marginTop: "5px" }}>
                            </div>
                            {/* last Part Grid */}

                            <div style={{ diaplay: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <h5>Customer List</h5>
                                {(isloading) ? (<p>Data is Loading...</p>) : <DataListShow
                                    customers={selectedDistributors}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    itemsPerPage={itemsPerPage}
                                    selectedCodes={selectedCodes}
                                    totalPages={totalPages}
                                    // onCheckboxChange={handleCheckboxChange}
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