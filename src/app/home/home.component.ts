import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SharedService } from '../shared/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetail: FormGroup | any;
  userDetailData: any = [];
  data : any = [];
  index: any;
  IsUpdate: boolean = false;
  IsNotSame: boolean = false;
  showForm : boolean = false;
  submitButtonDisplay : boolean = false;
  constructor(public sharedService: SharedService, public router: Router) { }

  ngOnInit(): void {
    this.userDetailData = this.sharedService.dataList;
    this.userDetail = new FormGroup({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    })   
  }

  add() {
    if (this.userDetail.invalid || this.userDetail.invalid) {
      this.userDetail.markAllAsTouched();
    }
    if (this.userDetail.valid) {
      this.userDetailData.push(this.userDetail.value);
      this.userDetail.reset();
    }  
  }

  checkPassword(event: any) {
    if (event.target.value == this.userDetail.controls.password.value) {
      this.IsNotSame = false;
    }
    else {
      this.IsNotSame = true;
    }
  }
  remove() {
    this.userDetailData.splice(this.index, 1);
    this.userDetail.reset();
  }
  update() {
    this.showForm = true;
    this.userDetailData.splice(this.index, 1, this.userDetail.value);
    this.userDetail.reset();
  }
  patchData(data: any, index: any) {
    this.index = index;
    this.IsUpdate = true;
    this.userDetail.controls['name'].patchValue(data.name);
    this.userDetail.controls['emailId'].patchValue(data.emailId);
    this.userDetail.controls['password'].patchValue(data.password);
    this.userDetail.controls['confirmPassword'].patchValue(data.confirmPassword);
    this.userDetail.controls['mobileNumber'].patchValue(data.mobileNumber);
  }

  submit() {
    this.sharedService.setData(this.userDetailData)
      this.router.navigate(["/detail"]);
  }
}
