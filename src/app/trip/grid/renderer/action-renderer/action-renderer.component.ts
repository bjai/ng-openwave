import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  template: `<div class="action" [ngClass]="cellValue.toLocaleLowerCase()">
  <div class="status-text" > 
  <span>Trip {{getStatus(cellValue)}}</span>  <span>Trip {{cellValue}}</span>
  </div>
  <div class="status-btns"> 
 <button class="btn btn-primary btn-sm" >View Track</button>
 <button class="btn btn-primary btn-sm" >View Map</button>
 </div>
</div>`,
  styleUrls: ['./action-renderer.component.scss']
})
export class ActionRendererComponent implements ICellRendererAngularComp {

  cellValue = '';


  agInit(params: ICellRendererParams<any, any>): void {
    this.cellValue = this.getValueToDisplay(params).toUpperCase();
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    this.cellValue = this.getValueToDisplay(params).toUpperCase();
    return true
  }

  getValueToDisplay = (params: ICellRendererParams) => {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  getStatus = (value: string): string => {
    if (value.toLocaleLowerCase() === 'end') {
      return "closed";
    }
    if (value.toLocaleLowerCase() === 'on-going') {
      return "progress";
    }
    return value;
  }

}
