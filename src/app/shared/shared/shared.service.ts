import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dataList = [];
  constructor() { }

  setData(userData:any){
    this.dataList = userData;
  }
}
