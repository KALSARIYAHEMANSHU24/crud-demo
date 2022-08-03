import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dataList = [];
  constructor() { }

  insertData(userData:any){
    this.dataList = userData;
  }
}
