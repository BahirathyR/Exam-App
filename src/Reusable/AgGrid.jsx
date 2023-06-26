
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import "ag-grid-community/dist/styles/ag-theme-balham.css";


export default function AgGirdReact({ columnDefs, rowData, pagination = true, height = '50vh', showGrid }) {
      console.log("row==", rowData)
      return (
            <div className="ag-theme-alpine  mb-0" style={{ height: height }}>
                  <AgGridReact
                        // domLayout='autoHeight'
                        animateRows={true}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
                        pagination={pagination}
                        paginationPageSize={10}
                        showGrid={showGrid}
                        // frameworkComponents={{
                        //       ButtonActionRenderer,
                        // }}

                  >
                  </AgGridReact>
            </div>
      );
};

