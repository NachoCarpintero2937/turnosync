import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-view-table-clients',
  templateUrl: './view-table-clients.component.html',
  styleUrls: ['./view-table-clients.component.scss']
})
export class ViewTableClientsComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columns: any;
  @Input() data: any;
  @Output() filters: any;
  @Output() delete = new EventEmitter();
  originalObject: any;
  // MatTable
  public list = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(public EnviromentService: EnviromentService,
    private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  form = this.fb.group({
    name: ['']
  })

  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
    this.list.sort = this.sort;
  }

  ngOnChanges(): void {
    this.initComponent()
  }

  initComponent() {
    this.list.data = this.data;
    this.originalObject = structuredClone(this.data)
  }

  //  UI
  tooltipDate(data: any) {
    return data;
  }

  filter() {
    const name = this.form.get('name')?.value!;
    if (!name) {
      this.list.data = this.originalObject;
    }
    const regex = new RegExp(name, 'i');
    this.list.data = this.list.data.filter((filter: any) => regex.test(filter.name))
  }

  reset() {
    this.list.data = this.originalObject;
  }

  sendWsp(data: any) {
    const newData = { "data": data };
    // this.EnviromentService.goToWsp(newData)
  }

  destroy(element: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { text: 'Vas a eliminar el cliente  <b>' + element?.name + '</b>'},
      width: '20%',
    });
    dialogRef.afterClosed().subscribe((modalData:any) => {
      if (modalData?.confirm) {
        this.delete.emit({id: element?.id})
      }
    });
  }

}
