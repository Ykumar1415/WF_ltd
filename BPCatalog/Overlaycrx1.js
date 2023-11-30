import React, { useEffect, useState } from "react";
import "./Overlay.css";
import DataListShowx1 from "./DataListShowx1";
import useUserStore from '../Store/store';
export function Overlay({ isOpen, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isloading, setIsloading] = useState(false);
    const { brand, pack, productfamily, productline,selectedSku } = useUserStore();
    const [customers, setCustomers] = useState([]);
    const [selectedCodes, setSelectedCodes] = useState([]);

    // convert array to string of form "'a','b','c'"
    const brand1 = brand.join(",");
    const pack1 = pack.map((i) => `'${i}'`).join(",");
    const productfamily1 = productfamily.map((i) => `'${i}'`).join(",");
    const productline1 = productline.map((i) => `'${i}'`).join(",");
   


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
                            <h2 style={{ width: "100%", height: "45px" }}>Show selected SKU Units</h2>
                            {/* First Part */}
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Brand : </h6>
                                    <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{brand1}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Pack Type : </h6>
                                    <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{pack1}</p>
                                </div>

                            </div>

                            {/* Second Type */}
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Product Family : </h6>
                                    <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{productfamily1}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>ProductLine : </h6>
                                    <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{productline1}</p>
                                </div>
                            </div>
                            
                            {/* Third Type */}
                            <div style={{ display: "flex", flexDirection: "row", rowGap: "8px", justifyContent: "space-between", marginTop: "5px" }}>
                            </div>
                            {/* last Part Grid */}

                            <div style={{ diaplay: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <h5>SKU List</h5>
                                {(isloading) ? (<p>Data is Loading...</p>) : <DataListShowx1
                                    customers={selectedSku}
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