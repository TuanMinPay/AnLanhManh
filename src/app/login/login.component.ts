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

  public handleLogin: Function = async (username, password) => {
    await axios.post('', {
      userName: username,
      password: password
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
