import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import ToggleSwitch from "../Components/ToggleSwitch";
import Swal from "sweetalert2";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import "../Stylesheets/ItemCreation.css";
import "../App.css";
import { APIWrapper, getHead, API_ENDPOINT } from "../Components/APIWrapper";

const ViewItem = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const onCellClicked = (CellClickedEvent) => {
    props.history.push({
      pathname: "/createItem",
      state: { detail: CellClickedEvent.data },
    });
    //console.log('Cell was clicked');
  };

  const onPendingChange = (newValue) => {
    setIsPending(newValue);
    offset = 0;
  };
  const perPage = 10;
  var offset = 0;

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const donwloadHandler = (event) => {

    
    Swal.fire({
    title: 'Now loading',
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    timer: 2000,
  }).then(
    () => {},
    (dismiss) => {
      if (dismiss === 'timer') {
        console.log('closed by timer!!!!');
        Swal.fire({ 
          title: 'Finished!',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    }
  )

    const requestOptions = {
      method: "POST",
      headers: getHead()
      };
  

    fetch(`${API_ENDPOINT}/downloadPendingItem`, requestOptions)
    .then((resp) => resp.blob())
    .then((res) => {
        // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([res]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `test.xls`,
      );

        // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      
    })
    .catch((err) => {
        
    Swal.fire({
      title: 'Download Error',
      text : 'Facing error while downloading'+err,
      icon: 'Success'
    });
    });
  
  };
  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: (params) => {
          const page = params.endRow / perPage;
          const requestOptions = {
            method: "POST",
            headers: getHead(),
            body: JSON.stringify({
              limit: 10,
              offset: offset,
              disp_flag: isPending ? 1 : 0, //0: All, 1: Pending
              role_code: localStorage.getItem("RoleId"),
              logged_in_user: localStorage.getItem("username"),
            }),
          };
          fetch(`${API_ENDPOINT}/viewItemDetails`, requestOptions)
            .then((resp) => resp.json())
            .then((res) => {
              offset += perPage;
              if (res.data != "no result found")
                params.successCallback(res.data, res.total);
              else params.successCallback("no result found", 0);
            })
            .catch((err) => {
              props.history.push("/");
              params.successCallback([], 0);
            });
        },
      };

      gridApi.setDatasource(dataSource);
    }
  }, [gridApi, isPending]);

  return (
    <div className="App">
      <h4 style={{ mraginTop: "10px", color: "darkcyan" }}>Item requests</h4>
      <div>
        <ToggleSwitch
          label="Pending"
          checked={isPending}
          onChange={onPendingChange}
        />

      </div>
      <div
        style={{
          width: "90%",
          height: "380px",
          marginLeft: "5%",
          marginTop: "30px",
        }}
        className="ag-theme-alpine ag-style"
      >
        <AgGridReact
          defaultColDef={{ flex: 1 }}
          rowHeight={25}
          pagination={true}
          rowModelType={"infinite"}
          paginationPageSize={perPage}
          cacheBlockSize={perPage}
          onGridReady={onGridReady}
          onCellClicked={onCellClicked}
          
        >
          <AgGridColumn
            field="docno"
            headerName="Doc No."
            cellClass="vertical-middle"
          />
          <AgGridColumn
            field="parent_code"
            headerName="Parent Code"
            cellClass="vertical-middle"
          />

          <AgGridColumn
            field="item_code"
            headerName="Item Code"
            cellClass="vertical-middle"
          />
          {/* <AgGridColumn
            field="product_line"
            headerName="Product Line"
            cellClass="vertical-middle"
          />
          <AgGridColumn
            field="parent_code_desc"
            headerName="Parent Code Description"
            cellClass="vertical-middle"
          /> */}
          <AgGridColumn
            field="item_desc"
            headerName="Item Description"
            cellClass="vertical-middle"
          />
          <AgGridColumn
            field="brand"
            headerName="Brand"
            cellClass="vertical-middle"
          />
          <AgGridColumn
            field="sub_status"
            headerName="Status"
            cellClass="vertical-middle"
          />
        </AgGridReact>
      </div>
      <span style={{float:"left",padding: "50px"}}><button className="button-28"  id='btn1' onClick={donwloadHandler}>Download SAP Pending(xls) <i id="downloadIcon1" class="fa fa-download"></i></button>  
      
       </span>

    </div>
  );
};

export default withRouter(ViewItem);
