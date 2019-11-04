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

  public handleLogin: Function = async (account, password) => {
    await axios.post('http://localhost:8080/api/auth/signin',  {
      "account": account,
      "password": password
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
