import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public handleLogin: Function = (username, password) => {
    axios({
      method: 'post',
      url: '',
      data: {
        userName: username,
        password: password
      }
    });
  }
}
