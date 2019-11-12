import { Component, OnInit, Inject } from '@angular/core';
import { async } from '@angular/core/testing';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, ) {
   }

  
  token: any = this.localStorage.getItem('token');

  userDetails: any;

  myInfo: any;

  API_PROFILE = 'http://localhost:8080/api/user-profile';

  API_GETME = "http://localhost:8080/api/auth/me";

  public getMe: Function = async => {
    const that = this;
    axios.get(that.API_GETME, { headers: { Authorization: that.token } })
    .then(function (response){
      that.myInfo = response.data.data;
      that.getProfile(`${that.API_PROFILE}/${that.myInfo.id}`);
      //console.log(that.myInfo);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  public getProfile: Function = async (url) => {
    const that = this;
    axios.get(url)
    .then(function (response){
      that.userDetails = response.data.data;
      //console.log(that.userDetails);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  logout() {
    var token = this.localStorage.getItem('token');
    if (token != null || token != undefined){
      this.localStorage.removeItem('token');
      this.window.location.href = '/login';
    }
  }

  ngOnInit() {
    this.getMe();
  }
}
