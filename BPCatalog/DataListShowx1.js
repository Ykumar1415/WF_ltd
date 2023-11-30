// 2nd overlay for get sku part
import React, { useState } from 'react';
import DataListItem from './DataList';
import './DataList.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import useUserStore from '../Store/store';
const CustomerList = ({ customers, currentPage, setCurrentPage, itemsPerPage, selectedCodes, totalPages, onCheckboxChange }) => {
    let [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
    let [endIndex, setendIndex] = useState(currentPageNumber * itemsPerPage);
    let [startIndex, setstartIndex] = useState(endIndex - itemsPerPage);
    let [currentItems, setCurrentItems] = useState(customers.slice(startIndex, endIndex));
    const [selectedRows, setSelectedRows] = useState([]); // need to replace with global array
    const {pushSelectedDistributors} = useUserStore();
    const prevHandler = () => {
        if (currentPageNumber >= 1) {
            setCurrentPage(currentPageNumber - 1);
            setCurrentPageNumber(currentPageNumber - 1)
            setstartIndex(startIndex - itemsPerPage);
            setendIndex(endIndex - itemsPerPage);
            setCurrentItems(customers.slice(Math.max(startIndex, 0), endIndex));
            console.log("prev", startIndex, endIndex, currentPageNumber, currentItems);

        }
        // const goToPrevPage = () => {
        //     if(currentPageNumber !== 1) 
        //         setCurrentPage(currentPageNumber - 1)
        // }
        // goToPrevPage()
    }
    
 
    const [gridApi, setGridApi] = useState(null);
    // const rowData = [
    //     { Customer_Code: "C001", Customer_Name: "Alice Johnson" },
    //     { Customer_Code: "C002", Customer_Name: "Bob Smith" },
    //     { Customer_Code: "C003", Customer_Name: "Charlie Brown" },
    //     { Customer_Code: "C004", Customer_Name: "David Wilson" },
    //     { Customer_Code: "C005", Customer_Name: "Eva Davis" },
    //     { Customer_Code: "C001", Customer_Name: "Alice Johnson" },
    //     { Customer_Code: "C002", Customer_Name: "Bob Smith" },
    //     { Customer_Code: "C003", Customer_Name: "Charlie Brown" },
    //     { Customer_Code: "C004", Customer_Name: "David Wilson" },
    //     { Customer_Code: "C005", Customer_Name: "Eva Davis" },
    //     { Customer_Code: "C001", Customer_Name: "Alice Johnson" },
    //     { Customer_Code: "C002", Customer_Name: "Bob Smith" },
    //     { Customer_Code: "C003", Customer_Name: "Charlie Brown" },
    //     { Customer_Code: "C004", Customer_Name: "David Wilson" },
    //     { Customer_Code: "C005", Customer_Name: "Eva Davis" },
    //     { Customer_Code: "C001", Customer_Name: "Alice Johnson" },
    //     { Customer_Code: "C002", Customer_Name: "Bob Smith" },
    //     { Customer_Code: "C003", Customer_Name: "Charlie Brown" },
    //     { Customer_Code: "C004", Customer_Name: "David Wilson" },
    //     { Customer_Code: "C005", Customer_Name: "Eva Davis" },
    //     { Customer_Code: "C001", Customer_Name: "Alice Johnson" },
    //     { Customer_Code: "C002", Customer_Name: "Bob Smith" },
    //     { Customer_Code: "C003", Customer_Name: "Charlie Brown" },
    //     { Customer_Code: "C004", Customer_Name: "David Wilson" },
    //     { Customer_Code: "C005", Customer_Name: "Eva Davis" },
    // ];
    // const columnDef = [
    //     { headerName: "Customer_Code", field: "customer_code", sortable: true },
    //     { headerName: "Customer_Name", field: "customer_name", sortable: true, },
    //     { headerName: "Dist_type", field: "dist_type", sortable: true, },
    //     //one more column for checkbox
    // ]
    const columnDef = [
        { headerName: "Item Code", field: "item_code", sortable: true },
        { headerName: "product_line", field: "product_line", sortable: true, },
        { headerName: "parent_code_desc", field: "parent_code_desc", sortable: true, },
        { headerName: "pack_type", field: "pack_type", sortable: true, },
        { headerName: "item_desc", field: "item_desc", sortable: true, },
        { headerName: "parent_code", field: "parent_code", sortable: true, },
        { headerName: "brand", field: "brand", sortable: true, },



        //one more column for checkbox
    ]
   
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

    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center", alignContent: "center" }}>
            <div
                className="ag-theme-alpine"
                style={{
                    height: "75vh",
                    width: "90%"
                }}
            >
                <AgGridReact
                    rowData={customers}
                    rowSelection="multiple"
                    // onGridReady={onGridReady}
                    columnDefs={columnDef}
                    // defaultColDef={defaultColDef}
                    pagination={true}
                    animateRows={true}
                    paginationPageSize={10}
                    // onGridReady={async (params) => {
                    //     await setGridApi(params.api);
                    //   }}
                    //   onSelectionChanged={async () => {
                    //     if (gridApi) {
                    //       const selectedNodes = await gridApi.getSelectedNodes();
                    //       const selectedData = selectedNodes.map((node) => node.data);
                    //       selectedData.map((e)=>pushSelectedDistributors(e));
                    //       setSelectedRows(selectedData);
                    //       console.log(selectedRows)
                    //     }
                    //   }}
                />

            </div>
        </div>
    );
};

export default CustomerList;
