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
    name: [''],
    phone: ['']
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
    const name = this.form.get('name')?.value || ''; // Valor del campo 'name'
    const phone = this.form.get('phone')?.value || ''; // Valor del campo 'phone'
  
    if (!name && !phone) {
      // Si ambos filtros están vacíos, restaurar la lista original
      this.list.data = this.originalObject;
      return;
    }
  
    const nameRegex = new RegExp(name, 'i'); // Expresión regular para el nombre
    const phoneRegex = new RegExp(phone, 'i'); // Expresión regular para la combinación de cod_area y phone
  
    this.list.data = this.originalObject.filter((item: any) => {
      const matchesName = name ? nameRegex.test(item.name) : true; // Coincidencia por nombre
      const fullPhone = `${item.cod_area}${item.phone}`; // Concatenar cod_area y phone
      const matchesPhone = phone ? phoneRegex.test(fullPhone) : true; // Coincidencia por cod_area + phone
      return matchesName && matchesPhone; // Debe coincidir con ambos criterios
    });
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
