
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

const CustomerItem = ({ customer, isChecked, onChange }) => {
    const handleCheckboxChange = () => {
        onChange(customer.customer_code);
    };
    const rowData = [
        {
            one: "Value 1A",
            two: "Value 2A",
            three: "Value 3A",
            four: "Value 4A",
          },
          {
            one: "Value 1B",
            two: "Value 2B",
            three: "Value 3B",
            four: "Value 4B",
          },
          {
            one: "Value 1C",
            two: "Value 2C",
            three: "Value 3C",
            four: "Value 4C",
          },
          {
            one: "Value 1A",
            two: "Value 2A",
            three: "Value 3A",
            four: "Value 4A",
          },
          {
            one: "Value 1B",
            two: "Value 2B",
            three: "Value 3B",
            four: "Value 4B",
          },
          {
            one: "Value 1C",
            two: "Value 2C",
            three: "Value 3C",
            four: "Value 4C",
          },
          {
            one: "Value 1A",
            two: "Value 2A",
            three: "Value 3A",
            four: "Value 4A",
          },
          {
            one: "Value 1B",
            two: "Value 2B",
            three: "Value 3B",
            four: "Value 4B",
          },
          {
            one: "Value 1C",
            two: "Value 2C",
            three: "Value 3C",
            four: "Value 4C",
          },
          {
            one: "Value 1A",
            two: "Value 2A",
            three: "Value 3A",
            four: "Value 4A",
          },
          {
            one: "Value 1B",
            two: "Value 2B",
            three: "Value 3B",
            four: "Value 4B",
          },
          {
            one: "Value 1C",
            two: "Value 2C",
            three: "Value 3C",
            four: "Value 4C",
          },
          {
            one: "Value 1A",
            two: "Value 2A",
            three: "Value 3A",
            four: "Value 4A",
          },
          {
            one: "Value 1B",
            two: "Value 2B",
            three: "Value 3B",
            four: "Value 4B",
          },
          {
            one: "Value 1C",
            two: "Value 2C",
            three: "Value 3C",
            four: "Value 4C",
          },
    ]
    const columnDefs = [
        {headerName: "Name",field:"name",sortable:true,checkboxSelection:true,headerCheckboxSelection:true}
        ,{headerName:"Age",field:"age"}
    ]

    return (
        // <div style={{ width: "100%",backgroundColor:"#FFF8C9",cursor:"pointer",borderRadius:"3rem"}} onClick = {handleCheckboxChange}>
        //     <input type="checkbox" checked={isChecked}  />
        //     <span style={{ width: "600px", display: "inline-block",textAlign:"center" }}>{customer.customer_name}</span>
        //     <span>{customer.customer_code}</span>

        // </div>
        <div
            className="ag-theme-alpine"
            style={{
                height: "90vh",
                width: "100%"
            }}
        >
            <AgGridReact
                rowData={rowData}
                rowSelection="multiple"
                // onGridReady={onGridReady}
                columnDefs={columnDefs}
                // defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
            />
        </div>

    );
};

export default CustomerItem;
