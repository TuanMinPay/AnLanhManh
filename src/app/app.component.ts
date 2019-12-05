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
      this.localStorage.clear();
      this.isLogin = false;
      this.window.location.href = this.window.location.href;
    }
  }

  getTotalCart() {
    return AppComponent.totalCart;
  }

  @ViewChild('top', { static: true }) top: ElementRef;

  scrollTop() {
    this.top.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
  }

  checkProfile() {
    const that = this;
    var token = localStorage.getItem('token');
    axios.get(`${environment.api_url}/api/user-profile/latest`, { headers: { Authorization: token } })
      .then(function (response) {
        that.userDetails = response.data.data;
        console.log(that.userDetails);
        localStorage.setItem('user', JSON.stringify(that.userDetails));
        if ((that.userDetails.height != null || that.userDetails.weight != null) && (window.location.href.indexOf('/step') != -1)) {
          window.location.href = '/';
          return;
        }
      })
      .catch(function (error) {
        if (error.response.data.status == 404 && (window.location.href.indexOf('/step') == -1)) {
          window.location.href = '/step';
        }
        console.log(error);
      });
  }

  ngOnInit() {
    var token = this.localStorage.getItem('token');
    var user = this.localStorage.getItem('user');
    var listCart = localStorage.getItem('listCart');
    if (token == null || token == undefined) {
      this.isLogin = false;
    } else {
      if (user == null || user == undefined) {
        this.checkProfile();
      };
      this.isLogin = true;
    }
    if (listCart == null || listCart == undefined || listCart == '') {
      AppComponent.totalCart = 0;
    } else {
      AppComponent.totalCart = JSON.parse(listCart).total;
    }
  }
}