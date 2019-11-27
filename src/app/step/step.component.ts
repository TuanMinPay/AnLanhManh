import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }
  textError: any = null;

  API_PROFILE = `${environment.api_url}/api/user-profile/create`;

  API_Benhly = `${environment.api_url}/api/category/parent/5`;

  API_GETME = `${environment.api_url}/api/auth/me`;

  API_UpdateCate = `${environment.api_url}/api/user-profile/{id_profile}/category`;

  currentStep: any = 1;

  token = this.localStorage.getItem('token');

  listBenhly: any;

  myInfo: any;

  userDetails: any;

  changeStep(step) {
    this.currentStep = step;
    console.log(this.currentStep);
  }

  data = {
    height: null,
    weight: null,
    age: null,
    exerciseIntensity: 1.2,
    gender: 1,
    status: 1,
    bodyFat: null
  }

  arrBl: any = [];
  public changeModel(ev, id) {
    if (id == 0) {
      this.arrBl = [];
      return;
    }
    if (ev.target.checked) {
      this.arrBl.push(id);
    } else {
      let i = this.arrBl.indexOf(id);
      this.arrBl.splice(i, 1);
    }
    console.log(this.arrBl);

  }

  // public getMe: Function = async => {
  //   const that = this;
  //   axios.get(that.API_GETME, { headers: { Authorization: that.token } })
  //   .then(function (response){
  //     that.myInfo = response.data.data;
  //     that.getProfile(`${that.API_PROFILE}/${that.myInfo.id}`);
  //     console.log(that.myInfo);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });
  // }

  // public getProfile: Function = async (url) => {
  //   const that = this;
  //   axios.get(url)
  //   .then(function (response){
  //     that.userDetails = response.data.data;
  //     console.log(that.userDetails);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });
  // }

  public updateProfile: Function = () => {
  }

  // public updateCate: Function = async => {
  //   const that = this;
  //   axios.put(`${environment.api_url}/api/user-profile/${this.userDetails.id}/category`,that.arrBl, { headers: { Authorization: that.token } })
  //   .then(function (response){
  //     console.log(response.data.data)
  //   })
  //   .catch(function (error){
  //     console.log(error);
  //   })
  // }


  public getBenhly: Function = () => {
    const that = this;
    axios.get(that.API_Benhly)
      .then(function (response) {
        that.listBenhly = response.data.data;
        //console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  validateStep() {
    const that = this;
    // validate here

    var invalid = true;

    // validate step 1
    if (this.currentStep == 1) {
      if (this.data.height && this.data.weight && this.data.age) {
        that.textError = null;
      } else {
        that.textError = "Vui lòng nhập đầy đủ thông tin !";
        return;
      }
    }

    if (this.currentStep == 3) {
      if (this.data.bodyFat) {
        const that = this;
        axios.post(that.API_PROFILE, that.data, { headers: { Authorization: that.token } }).then(function (response) {
          console.log(response);
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
        //that.updateCate();
        console.log(that.data);
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
        console.log(this.data);
        this.currentStep = this.currentStep + 1;
        invalid = false;
      }
    }
  }

  endStep() {
    //alert(1)
  }

  goHome() {
    this.window.location.href = '/';
  }

  ngOnInit() {
    this.getBenhly();
    //console.log(this.token)
    // this.getMe();
    // this.getProfile();
  }
}
