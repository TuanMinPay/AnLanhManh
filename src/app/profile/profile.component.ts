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

  textError: any = null;

  API_PROFILE = 'http://localhost:9000/api/user-profile';

  API_GETME = "http://localhost:9000/api/auth/me";

  API_CHANGEPASSWORD = "http://localhost:9000/api/auth/password/change";

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
  

  public changePassword: Function = async (oldPassword: any, password: any, confirmPassword: any) => {
    const that = this;
    if(oldPassword.length == 0 || password.length == 0 || confirmPassword.length == 0){
      that.textError = "Vui lòng nhập thông tin"
    }else if(password.length < 6 ){
      that.textError = "Mật khẩu phải lớn hơn 6 kí tự!"
    }else if(password.length != confirmPassword.length){
      that.textError = "Mật khẩu không trùng nhau !"
    }else{
      that.textError = null;
      axios.put("http://localhost:8080/api/auth/password/change",
    {
      oldPassword: oldPassword,
      password: password,
      confirmPassword: confirmPassword
    },
    { headers: { Authorization: that.token } }
    )
    .then(function (response){
      if(response.data.status == 200){
        that.window.location.href = '/profile';
      }
        console.log(response)
    })
    .catch(function (error) {
      if (error.response.data.status == 401) {
        that.textError = error.response.data.message;
      } else {
        that.textError = null;
      }
    });
    }
    
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
