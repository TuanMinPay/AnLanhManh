import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';

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

  listCart: any = null;

  textError: any = null;

  API_PROFILE = `${environment.api_url}/api/user-profile`;

  API_GETME = `${environment.api_url}/api/auth/me`;

  API_CHANGEPASSWORD = `${environment.api_url}/api/auth/password/change`;

  public getMe: Function = () => {
    const that = this;
    axios.get(that.API_GETME, { headers: { Authorization: that.token } }).then(function (response) {
      that.myInfo = response.data.data;
      //that.getProfile(`${that.API_PROFILE}/${that.myInfo.id}`);
      //console.log(that.myInfo);
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  getLatestProfile(){
    const that = this;
    axios.get(`${environment.api_url}/api/user-profile/latest`, { headers: { Authorization: that.token } })
    .then(function (response){
      //console.log(response.data.data);
      that.userDetails = response.data.data;
    })
    .catch(function (error){
      console.log(error);
    })
  }

  public changePassword: Function = async (oldPassword: any, password: any, confirmPassword: any) => {
    const that = this;
    if (oldPassword.length == 0 || password.length == 0 || confirmPassword.length == 0) {
      that.textError = "Vui lòng nhập thông tin"
    } else if (password.length < 6) {
      that.textError = "Mật khẩu phải lớn hơn 6 kí tự!"
    } else if (password.length != confirmPassword.length) {
      that.textError = "Mật khẩu không trùng nhau !"
    } else {
      that.textError = null;
      axios.put(that.API_CHANGEPASSWORD,
        {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: confirmPassword
        }, { headers: { Authorization: that.token } }).then(function (response) {
          if (response.data.status == 200) {
            that.window.location.href = '/profile';
          }
          console.log(response)
        }).catch(function (error) {
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
    if (token != null || token != undefined) {
      this.localStorage.removeItem('token');
      this.localStorage.removeItem('listCart');
      this.window.location.href = '/login';
    }
  }

  ngOnInit() {
    this.getMe();
    this.getLatestProfile();
    console.log(this.token);
  }
}
