import { Injectable, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private notifier: NotifierService) {}
  public toast: EventEmitter<any> = new EventEmitter();

  showToastNew(id: string, message: string, type: string): void {
    this.notifier.show({
      id,
      message,
      type,
    });
  }
}
