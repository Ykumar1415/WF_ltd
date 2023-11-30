import React, { useEffect, useState } from "react";
import "./Overlay.css";
import useUserStore from '../Store/store';
import DataListShowx from "./DataListShowx";
export function Overlay({ isOpen, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isloading, setIsloading] = useState(true);
    const { brand, pack, productfamily, productline } = useUserStore();
    const [customers, setCustomers] = useState([]);
    const [selectedCodes, setSelectedCodes] = useState([]);

    // convert array to string of form "'a','b','c'"

    const brand1 = brand.join(",");
    const pack1 = pack.map((i) => `'${i}'`).join(",");
    const productfamily1 = productfamily.map((i) => `'${i}'`).join(",");
    const productline1 = productline.map((i) => `'${i}'`).join(",");

     



    useEffect(() => {
        const getCustomers = async () => {
            const response = await fetch("http://192.168.0.8:5004/intranet_app_api_v2/createCatalog/getSelectedSKU", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                },
                body: JSON.stringify({
                    "brand":brand1,
                    "pack_type":pack1,
                    "product_line": productline1
                })
            });

            const data = await response.json();
            setCustomers(data.data.sku_list);
            console.log(data.data.sku_list);
            //   useUserStore().pushStoreDataList(data.data.distributor_details);
            //   console.log({ "useUserStore": useUserStore().StoreDataList });
            setIsloading(false);
        };

        getCustomers();
    }, []);


    const totalItems = 50;
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
                            <h2 style={{ width: "100%", height: "45px" }}>Show All SKU Units</h2>
                            {/* First Part */}
                            <div style={{ display: "flex", flexDirection: "row", gap: "400px", marginTop: "5px" }}>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Brand : </h6>
                                    <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{brand1}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Pack : </h6>
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
                                    <h6 style={{ padding: "0", width: "99.3px", textAlign: "left", paddingTop: "2px", margin: "0" }}>Product Line : </h6>
                                    <p style={{ padding: "0", paddingLeft: "2px", margin: "0", flex: "1", textAlign: "left" }}>{productline1}</p>
                                </div>
                            </div>
                            {/* last Part Grid */}
                            

                             <div style={{ diaplay: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <h5>Customer List</h5>
                                {(isloading) ? (<p>Data is Loading...</p>) : <DataListShowx
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