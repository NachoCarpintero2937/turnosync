import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-table-roles',
  templateUrl: './view-table-roles.component.html',
  styleUrls: ['./view-table-roles.component.scss']
})
export class ViewTableRolesComponent implements OnChanges,OnInit{
  @Input() columns: any;
  @Input() data: any;
  @Output() action = new EventEmitter()
  // MatTable
  public list = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
 constructor(private Router: Router){}

 ngOnInit(): void {

 }

 ngOnChanges(): void {
  this.initComponent()
 }

 goToRole(role:any){
 this.Router.navigate(['/in/users/view-role'], {queryParams: {role: JSON.stringify({
  id: role?.id,
  name : role?.name,
  permissions: role?.permissions
 })}})
 }

 initComponent(){
  this.list.data = this.data;
 }
  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
    this.list.sort = this.sort;
   }
}
