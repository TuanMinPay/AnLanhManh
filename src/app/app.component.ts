import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(
  ) { }

  isLogin: boolean = false;

  logout() {
    var token = localStorage.getItem('token');
    if (token != null || token != undefined){
      this.isLogin = true;
      localStorage.removeItem('token');
      this.isLogin = false;
      window.location.href = window.location.href;
    }
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    if (token == null || token == undefined) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
}