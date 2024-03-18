import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private EnviromentService: EnviromentService) { }

  encryptData(data: any): string {
    const encrypted = AES.encrypt(JSON.stringify(data), this.EnviromentService.secretKey);
    return encrypted.toString();
  }

  decryptData(data: any): string {
    const decrypted = AES.decrypt(data, this.EnviromentService.secretKey).toString(enc.Utf8);
    return decrypted;
  }
}
