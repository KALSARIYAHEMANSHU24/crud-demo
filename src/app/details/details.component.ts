import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  listData :any=[];
  constructor(public sharedService:SharedService) {

   }

  ngOnInit(): void {
   
      console.log(this.sharedService.dataList);
  }

}
