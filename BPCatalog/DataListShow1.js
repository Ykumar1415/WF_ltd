import React, { useState } from 'react';
import DataListItem from './DataList';
import './DataList.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
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
       
    }
    
 
    const [gridApi, setGridApi] = useState(null);
 
    const columnDef = [
        { headerName: "Customer_Code", field: "customer_code", sortable: true },
        { headerName: "Customer_Name", field: "customer_name", sortable: true, },
        { headerName: "Dist_type", field: "dist_type", sortable: true, },
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
                    height: "50vh",
                    width: "60%"
                }}
            >
                <AgGridReact
                    rowData={customers}
                    rowSelection="multiple" 
                    columnDefs={columnDef}
                    pagination={true}
                    animateRows={true}
                    paginationPageSize={10}
              
                />

            </div>
        </div>
    );
};

export default CustomerList;
