import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { async } from 'q';

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

  API_BENHLY = "localhost:9000/api/category/parent/5";

  currentStep: any = 1;

  token = this.localStorage.getItem('token');

  listBenhly: any;

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

  public getBenhly: Function = async => {
    const that = this;
    axios.get("localhost:9000/api/category/parent/5")
    .then(function(response){
      that.listBenhly = response.data.data;
      console.log(response.data.data);
    })
    .catch(function (error){
      console.log(error);
    });
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
    this.getBenhly();
  }
}
