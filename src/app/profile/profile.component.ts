import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

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
    var token = localStorage.getItem('token');
    if (token != null || token != undefined){
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  } 
}
