import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-view-table-users',
  templateUrl: './view-table-users.component.html',
  styleUrls: ['./view-table-users.component.scss']
})
export class ViewTableUsersComponent implements AfterViewInit, OnChanges,OnInit{
  @Input() columns: any;
  @Input() data: any;
  @Output() action = new EventEmitter()
  // MatTable
  public list = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
 constructor(
  private UserService: UsersService,
  private ToastService: ToastService,
  private dialog: MatDialog
  ){}

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
 
 statusUser(status:number, userId: number,name : string){
  let statusText = status ? 'activar' : 'suspender';
  const dialogRef = this.dialog.open(DialogConfirmComponent, {
    data: { text: 'Vas a '+ statusText  +' al usuario <b>' + name  + '</b>'},
    width: '20%',
  });
  dialogRef.afterClosed().subscribe((modalData:any) => {
    if (modalData?.confirm) {
      this.goToSuspendUser(status,userId)
    }
  });
 }

 goToSuspendUser(status:number, userId: number){
  this.UserService.setStatus({ status: status, user_id: userId }).then((status:any)=>{
    this.ToastService.showToastNew( '',status?.message,'success' );
    this.action.emit();
  }).catch(e =>{})
 }

 

//  UI
tooltipDate(data:any){
 return data;
}
}
