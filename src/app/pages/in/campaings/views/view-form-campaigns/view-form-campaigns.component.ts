import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-form-campaigns',
  templateUrl: './view-form-campaigns.component.html',
  styleUrls: ['./view-form-campaigns.component.scss']
})
export class ViewFormCampaignsComponent implements OnInit{

  @Output() submit = new EventEmitter();
  @Input() type!: string;
  @Input() emails!: any;
  @Input() phones!: any;
  @Input() submitFormFlag!: boolean;
  selectedFile: any = null;
  imageSrc!: string;
  constructor(
    private FormBuilder: FormBuilder,
    private ToastService: ToastService
  ) { }

  form = this.FormBuilder.group({
    title: [''],
    message: ['', Validators.required],
    type: [''],
    image : [''],
    showButton: [false],
    process: [true],
  });

  submitForm(){
    this.submit.emit(this.form.getRawValue());
    this.cleanForm();
  }

  ngOnInit(): void {
   this.setValueForm();
  }

  setValueForm(){
    this.form.get('type')?.setValue(this.type);
  }

  handleInputChange(event?: any) {
    this.selectedFile = event.target.files[0] ?? null;
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.ToastService.showToastNew(
        '',
        'Formato de imagen incorrecto',
        'error'
      );
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e?: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.form.get('image')?.setValue(this.imageSrc);
  }

  cleanForm(){
    this.form.get('title')?.setValue('');
    this.form.get('message')?.setValue('');
    this.form.get('image')?.setValue('');
    this.imageSrc = '';
    this.selectedFile = null;
  }
}
