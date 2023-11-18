import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-table-services',
  templateUrl: './view-table-services.component.html',
  styleUrls: ['./view-table-services.component.scss']
})
export class ViewTableServicesComponent {
  @Input() columns: any;
  @Input() data: any;
  // MatTable
  public list = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
 constructor(){}

 ngOnInit(): void {

 }

 ngAfterViewInit(): void {
  this.list.paginator = this.paginator;
  this.list.sort = this.sort;
 }

 ngOnChanges(): void {
  this.initComponent()
 }

 initComponent(){
  this.list.data = this.data;
 }

//  UI
tooltipDate(data:any){
 return data;
}
}
