import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

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

  isLogin: boolean = false;

  logout() {
    var token = this.localStorage.getItem('token');
    if (token != null || token != undefined) {
      this.isLogin = true;
      this.localStorage.removeItem('token');
      this.isLogin = false;
      this.window.location.href = this.window.location.href;
    }
  }

  getTotalCart() {
    return AppComponent.totalCart;
  }

  ngOnInit() {
    var token = this.localStorage.getItem('token');
    if (token == null || token == undefined) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }

    var listCart = localStorage.getItem('listCart');
    if (listCart == null || listCart == undefined || listCart == '') {
      AppComponent.totalCart = 0;
    } else {
      AppComponent.totalCart = JSON.parse(listCart).total;
    }
  }
}