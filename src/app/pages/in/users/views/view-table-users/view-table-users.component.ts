import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-view-table-users',
  templateUrl: './view-table-users.component.html',
  styleUrls: ['./view-table-users.component.scss']
})
export class ViewTableUsersComponent implements AfterViewInit, OnChanges,OnInit{
  @Input() columns: any;
  @Input() data: any;

  // MatTable
  public list = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
 constructor(private UserService: UsersService){}

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
 
 statusUser(status:number, userId: number){
  this.UserService.setStatus({ status: status, user_id: userId }).then((status)=>{

  }).catch(e =>{})
 }

//  UI
tooltipDate(data:any){
 return data;
}
}
