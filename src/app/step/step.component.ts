import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }
  textError: any = null;

  API_PROFILE = 'http://localhost:9000/api/user-profile/create';

  currentStep: any = 1;

  token = this.localStorage.getItem('token');

  changeStep(step) {
    this.currentStep = step;
  }

  dataStep1 = {
    height: null,
    weight: null,
    age: null,
    status: 1
  }

  dataStep3 = {
    target: null,
    time: null
  }

  validateStep(s) {
    const that = this;
    // validate here

    var invalid = true;

    // validate step 1
    if(this.currentStep == 1){
      if (this.dataStep1.height && this.dataStep1.weight && this.dataStep1.age) {
        axios.put(that.API_PROFILE, that.dataStep1, { headers: { Authorization: that.token } })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
        that.textError = null;
      } else {
        that.textError = "Vui lòng nhập đầy đủ thông tin !";
        return;
      }
    }
    

    // validate step 3
    if(this.currentStep == 3){
      if(this.dataStep3.target && this.dataStep3.time){
        that.textError = null;
        invalid = true;
      }
      else{
        that.textError = "Vui lòng nhập đầy đủ thông tin !"
        return;
      }
    }
      

    if (invalid) {
      if (this.currentStep == 4) {
        return;
      } else {
        console.log(this.dataStep3);
        this.currentStep = this.currentStep + 1;
        invalid = false;
      }
    }
  }

  endStep() {
    alert(1)
  }

  goHome() {
    this.window.location.href = '/';
  }
  ngOnInit() {
    //console.log(localStorage.getItem('token'));
  }
}
