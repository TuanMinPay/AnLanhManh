import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import axios from 'axios'
import { from } from 'rxjs';
import { environment } from "../environments/environment"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) {
  }

  public static totalCart: number = 0;

  message: any;

  userDetails: any;

  isLogin: boolean = false;

  logout() {
    var token = this.localStorage.getItem('token');
    if (token != null || token != undefined) {
      this.isLogin = true;
      this.localStorage.removeItem('token');
      this.localStorage.removeItem('listCart');
      this.isLogin = false;
      this.window.location.href = this.window.location.href;
    }
  }

  getTotalCart() {
    return AppComponent.totalCart;
  }

  @ViewChild('top', { static: true }) top: ElementRef;

  scrollTop() {
    this.top.nativeElement.scrollIntoView({ block: 'start',  behavior: 'smooth', inline: 'nearest' });
  }

  checkProfile() {
    const that = this;
    var token = localStorage.getItem('token');
    axios.get(`${environment.api_url}/api/user-profile/latest`, { headers: { Authorization: token } })
      .then(function (response) {
        that.userDetails = response.data.data;
        //console.log(that.userDetails);
        if(that.userDetails.height == null || that.userDetails.weight == null){
          that.window.location.href = '/step'
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  ngOnInit() {
    var token = this.localStorage.getItem('token');
    if (token == null || token == undefined) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.checkProfile();
    }

    var listCart = localStorage.getItem('listCart');
    if (listCart == null || listCart == undefined || listCart == '') {
      AppComponent.totalCart = 0;
    } else {
      AppComponent.totalCart = JSON.parse(listCart).total;
    }
  }
}