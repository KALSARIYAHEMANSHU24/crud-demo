import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  listData :any=[];
  userDetail: FormGroup | any;
  userDetailsDataFromService : any = [];
  index: any;
  IsUpdate : boolean = false;
  IsNotSame: boolean = false;


  constructor(public sharedService:SharedService) {}

  ngOnInit(): void {
      this.userDetailsDataFromService = this.sharedService.dataList;
      this.userDetail = new FormGroup({
        name: new FormControl('', Validators.required),
        emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        mobileNumber: new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      })
  }

  update(data : any, i : any) {
    this.index = i;
    this.IsUpdate = true;
    this.userDetail.controls['name'].patchValue(data.name);
    this.userDetail.controls['emailId'].patchValue(data.emailId);
    this.userDetail.controls['password'].patchValue(data.password);
    this.userDetail.controls['confirmPassword'].patchValue(data.confirmPassword);
    this.userDetail.controls['mobileNumber'].patchValue(data.mobileNumber);
  }

  checkPassword(event: any) {
    if (event.target.value == this.userDetail.controls.password.value) {
      this.IsNotSame = false;
    }
    else {
      this.IsNotSame = true;
    }
  }

  saveChanges() {
    this.userDetailsDataFromService.splice(this.index, 1, this.userDetail.value);
    this.sharedService.setData(this.userDetailsDataFromService);
    this.userDetail.reset();
  }

  remove() {
    this.userDetailsDataFromService.splice(this.index, 1);
    this.sharedService.setData(this.userDetailsDataFromService);
    this.userDetail.reset();
  }
}
