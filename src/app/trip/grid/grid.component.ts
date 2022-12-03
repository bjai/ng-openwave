import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridReadyEvent, CellClickedEvent, ColDef, ValueFormatterParams, ColumnApi, GridApi } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import * as data from '../../../assets/json/trip.json';
import { ActionRendererComponent } from './renderer/action-renderer/action-renderer.component';

import 'ag-grid-enterprise';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  rowHeight = 100;
  gridApi = {} as GridApi;
  gridColumnApi = {} as ColumnApi;
  public columnDefs: ColDef[] = [
    {
      field: 'trip_status',
      cellRenderer: ActionRendererComponent,
      headerName: 'Actions'
    },
    {
      field: 'booking_source', headerName: 'Booking Source',
      valueFormatter: (params: ValueFormatterParams) => this.textFormatter(params)
    },
    { field: 'trip_id', headerName: 'Trip No.' },
    {
      field: 'trip_date', headerName: 'Trip Date', filter: 'agDateColumnFilter'
    },
    { field: 'pickup_time', headerName: 'Trip Pickup Time' },
    { field: 'company_name', headerName: 'Customer Name' },
    { field: 'guest_name', headerName: 'Guest Name' }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };


  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = of((data as any).default);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (window.innerWidth >= 480) {
      //gridOptions.setColumnDefs(mobileColumn);
      params.api.sizeColumnsToFit();
    }
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  textFormatter = (params: ValueFormatterParams) => {
    return params.value.toUpperCase();
  }
  exportAsExcel(): void {
    this.gridApi.exportDataAsExcel({
      columnKeys: this.generateColumnsForExcel(),
      processCellCallback: function (params) {
        return params.value;
      }
    })
  }

  exportAsCSV(): void {
    this.gridApi.exportDataAsCsv({
      columnKeys: this.generateColumnsForExcel(),
      processCellCallback: function (params) {
        return params.value;
      }
    })
  }

  generateColumnsForExcel(): string[] {
    const keys = this.gridColumnApi
      .getAllDisplayedColumns()
      .map(column => column.getColId())

    const amountIndex: number = keys.findIndex(column => column === 'newPrice');
    keys.splice(amountIndex + 1, 0, 'currency');

    return keys;
  }





}
