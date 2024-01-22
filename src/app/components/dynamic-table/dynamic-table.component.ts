import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { slidingAnimation } from 'src/app/animations/list.animation';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  animations: [slidingAnimation]
})
export class DynamicTableComponent<T> implements OnChanges {

  @Input() tableData:T[] = [];
  @Input() tableHeadersMap:any = {};
  @Input()actions:Array<'view'|'delete'> = [];

  @Output()onView:EventEmitter<T> = new EventEmitter<T>();
  @Output()onDelete:EventEmitter<T> = new EventEmitter<T>();

  tableHeaders:string[] = [];
  
  constructor() {
  }

  ngOnChanges(): void {
    this.mapTableHeaders();
  }

  mapTableHeaders(){
    if(this.tableData.length <= 0) return;
    this.tableHeaders = [];
    Object.keys(this.tableData[0]).forEach((key:string) => {
      this.tableHeaders.push(key);
    });
  }

  onClickView(row:T){
    this.onView.emit(row);
  }

  onClickDelete(row:T){
    this.onDelete.emit(row);
  }

}
