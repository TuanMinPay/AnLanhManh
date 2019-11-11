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

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, ) { }

  ngOnInit() {
    this.getProfile();
  }

  userDetails: any;
  id: any;
  API_PROFILE = 'http://localhost:8080/api/user-profile' + this.id;

  public getProfile: Function = async => {
    const that = this;
    axios.get(that.API_PROFILE)
    .then(function (response){
      that.userDetails = response.data.data;
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
}
