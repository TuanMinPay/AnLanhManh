import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor() { }

  isLogin: boolean = false;

  logout() {
    // handle logout
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    if (token == null || token == undefined || token == '') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
}
