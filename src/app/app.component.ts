import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(
    private router: Router,
  ) { }

  isLogin: boolean = false;

  
  logout() {
    const that = this;
    var token = localStorage.getItem('token');
    if (token != null || token != undefined || token != ''){
      this.isLogin = true;
      localStorage.removeItem('token');
      window.location.href = '/login';
      this.isLogin = false;
      // if(localStorage.getItem('token') == null){
      //   alert("null");
      // }
      // console.log();
      //that.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    console.log(token);
    if (token == null || token == undefined || token == '') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
}
