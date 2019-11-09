import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  textError: any = null;
  public handleLogin: Function = async (account: any, password: any) => {
    const that = this;
    if (password.length == 0 || account.length == 0) {
      that.textError = "Please enter full infomation !";
    } else {
      that.textError = null;
      await axios.post('http://localhost:8080/api/auth/signin', {
        account: account,
        password: password
      }).then(function (response) {
        if (response.data.status == 200) {
          localStorage.setItem("token", response.data.accessToken);
          window.location.href = '/';
        }
      }).catch(function (error) {
        if (error.response.data.status == 401) {
          that.textError = error.response.data.message;
        } else {
          that.textError = null;
        }
      });
    }
  }

  ngOnInit() {
    var token: any = localStorage.getItem('token');
    if (token != null || token != undefined) {
      window.location.href = '/';
    }
  }

}

