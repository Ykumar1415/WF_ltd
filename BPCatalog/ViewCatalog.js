import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import BtnCellRenderer from './BtnCellRenderer.js';

export default function GridExample() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const columnDefs = [

    {
      field: 'Template_id',
      maxWidth: 90,
    },
    {
      field: 'Short_Description',
      minWidth: 150,
    },
    {
      field: 'Detailed_Description',
      maxWidth: 90,
    },
    {
      field: 'Created_By',
      minWidth: 150,
    },
    {
      field: 'Ul_Status',
      minWidth: 150,
    },
    { field: 'Pending_with' },
    { field: 'From_Date' },
    { field: 'To_Date' },
    { field: 'Created_At' },
    {
      field: 'athlete',
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function (field) {
          alert(`${field} was clicked`);
        },
      },
      minWidth: 150,
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div style={{ width: '100%', height: '100%', marginTop: "5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        id="myGrid"
        style={{
          height: '70vh',
          width: '95vw',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      </div>
    </div>
  );
};

