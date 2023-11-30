import React, { useState } from 'react';
import DataListItem from './DataList';
import './DataList.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import useUserStore from '../Store/store';
import { useEffect } from 'react';
import Loading from './Loading';
import worker from '../app.worker'
import WebWorker from '../WebWorker.js';
const CustomerList = ({ customers, currentPage, setCurrentPage, itemsPerPage, selectedCodes, totalPages, onCheckboxChange }) => {
    let [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
    let [endIndex, setendIndex] = useState(currentPageNumber * itemsPerPage);
    let [startIndex, setstartIndex] = useState(endIndex - itemsPerPage);
    let [currentItems, setCurrentItems] = useState(customers.slice(startIndex, endIndex));
    const [selectedRows, setSelectedRows] = useState([]); // need to replace with global array
    const { pushSelectedDistributors, allDistributors, pushAllSelectedDistributors, selectedDistributors, pushallDistributors, setAllSelected, unsetAllSelected, removeallDistributors } = useUserStore();
const [isSelectAll, setIsSelectAll] = useState(false);
    const prevHandler = () => {
        if (currentPageNumber >= 1) {
            setCurrentPage(currentPageNumber - 1);
            setCurrentPageNumber(currentPageNumber - 1)
            setstartIndex(startIndex - itemsPerPage);
            setendIndex(endIndex - itemsPerPage);
            setCurrentItems(customers.slice(Math.max(startIndex, 0), endIndex));
            console.log("prev", startIndex, endIndex, currentPageNumber, currentItems);

        }

    }
    

 
    const [gridApi, setGridApi] = useState(null);

    const columnDef = [
        { headerName: "Customer_Code", field: "customer_code", sortable: true, checkboxSelection: true, headerCheckboxSelection: true, headerClass: "ag-header-cell-label-center" },
        { headerName: "Customer_Name", field: "customer_name", sortable: true, headerClass: "ag-header-cell-label-center2" },
        { headerName: "Dist_type", field: "dist_type", sortable: true, headerClass: "ag-header-cell-label-center1" },
        //one more column for checkbox
    ]
const defaultColDef = {
        sortable: true,
        filter: true,
        // floatingFilter: true,
        resizable: true,
        flex: 1,
        width: 350,
        headerCheckboxSelectionCurrentPageOnly: true,

    }
   
    const nextHandler = () => {
        if (currentPage <= totalPages) {
            setCurrentPage(currentPage + 1);
            setCurrentPageNumber(currentPageNumber + 1)
            setstartIndex(startIndex + itemsPerPage);
            setendIndex(endIndex + itemsPerPage);
            setCurrentItems(customers.slice(startIndex, Math.min(endIndex, customers.length)));
            console.log("next", startIndex, endIndex, currentPageNumber, currentItems);

        }
        
    }
    const [selecting, setSelecting] = useState(false);

    useEffect(() => {
        if (gridApi && selectedDistributors.length > 0) {
            const idsSet = new Set(selectedDistributors.map(obj => obj.customer_code));
            gridApi.forEachNode((node) => {
                if (idsSet.has(node.data.customer_code)) {
                    node.setSelected(true);
                }
            });
        }
        if (allDistributors.length > 0) {

            setIsSelectAll(true);
        }

    }, [gridApi, selectedDistributors]);
    const [showLoading, setShowLoading] = useState(false);

    const selectAllItems = () => {
        if (isSelectAll) {
            removeallDistributors();
            unsetAllSelected();
            setIsSelectAll(!isSelectAll);
            return;
        }
        const webWorker = new WebWorker(worker);
        webWorker.postMessage({ customers, type: "selectAll" });

        // setIsSorting(true);
        setShowLoading(true);
        setSelecting(true);

        webWorker.addEventListener('message', (event) => {
            const sortedList = event.data;
            setAllSelected();
            pushallDistributors(sortedList);
            // pushAllSelectedDistributors(sortedList);
            setSelecting(false);
            setIsSelectAll(!isSelectAll);
            setShowLoading(false);
            console.log("sortedList Here", sortedList)
        });

        return;


    }


    return (
        <div style={{ display: "flex", width: "100%", textAlign: "center", justifyContent: "center", alignContent: "center" }}>

            <div
                className="ag-theme-alpine"
                style={{
                    height: "50vh",
                    width: "65vw",
                    textAlign: "center"
                }}
            >
<button style={{ position: "relative", right: "29rem", backgroundColor: "#E0F4FF", border: "1rem", padding: "5px", border: "none" }} onClick={selectAllItems}>{(isSelectAll) && <span>&#10003;</span>}{selecting ? "Please Wait" : ((isSelectAll) ? "All Selected" : "Select All")}</button>
                <AgGridReact
                    rowData={customers}
                    rowSelection="multiple"
                    // onGridReady={onGridReady}
onGridReady={async (params) => {
                        await setGridApi(params.api);
                    }}
                    onRowValueChanged={async () => {
                        await console.log(gridApi)
                    }}
                    columnDefs={columnDef}
                    onFirstDataRendered={
                        () => {

                            if (selectedDistributors.length > 0 && gridApi) {
                                const idsSet = new Set(selectedDistributors.map(obj => obj.customer_code));
                                console.log("selectedDistributors", selectedDistributors)
                                gridApi.forEachNode((node) => {
                                    if (idsSet.has(node.data.customer_code)) {
                                        console.log(node)

                                        node.setSelected(true);
                                    }
                                }
                                )
                            }
                        }
                    }
                    defaultColDef={defaultColDef}
                                        pagination={true}
                    animateRows={true}
                    paginationPageSize={6}
                    rowMultiSelectWithClick={true}

                      onSelectionChanged={async () => {
                        if (gridApi) {
                          const selectedNodes = await gridApi.getSelectedNodes();
                          const selectedData = selectedNodes.map((node) => node.data);
                          selectedData.map((e) => {
                            if (!selectedDistributors.includes(e)) {
                              pushSelectedDistributors(e);
                            }
                          });
                          setSelectedRows(selectedData);
                          console.log(selectedRows)
                        }
                      }}
                />

            </div>
        </div>
    );
};

export default CustomerList;