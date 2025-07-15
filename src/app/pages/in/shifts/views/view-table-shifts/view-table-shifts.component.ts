import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-view-table-shifts',
  templateUrl: './view-table-shifts.component.html',
  styleUrls: ['./view-table-shifts.component.scss']
})
export class ViewTableShiftsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() columns: any;
  @Input() data: any;
  originalObject: any;
  // MatTable
  public list = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private fb: FormBuilder) { }

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


  filter() {
    const name = this.form.get('name')?.value!;
    if(!name){
      this.list.data = this.originalObject;
    }
    const regex = new RegExp(name, 'i');
    this.list.data = this.list.data.filter((filter: any) => regex.test(filter?.client?.name))
  }
  reset() {
    this.list.data = this.originalObject;
  }

  //  UI
  tooltipDate(data: any) {
    return data;
  }
}
