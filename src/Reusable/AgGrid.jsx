
import React, { useState,useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import "ag-grid-community/dist/styles/ag-theme-balham.css";


export default function AgGirdReact({ columnDefs, rowData, pagination = true, height = '50vh', showGrid,width ='120%'}) {
      console.log("row==", rowData)
      const headerHeight = 80;
      const defaultColDef = useMemo(() => {
            return {
              resizable: true,
              initialWidth: 200,
              wrapHeaderText: true,
              autoHeaderHeight: true,
            };
          }, []);

      return (
            <div className="ag-theme-alpine  mb-0" style={{ height: height, width:width }}>
                  <AgGridReact
                        // domLayout='autoHeight'
                        animateRows={true}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        headerHeight={headerHeight}
                        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
                        pagination={pagination}
                        paginationPageSize={5}
                        showGrid={showGrid}
                        defaultColDef={defaultColDef}
                        // frameworkComponents={{
                        //       ButtonActionRenderer,
                        // }}

                  >
                  </AgGridReact>
            </div>
      );
};

