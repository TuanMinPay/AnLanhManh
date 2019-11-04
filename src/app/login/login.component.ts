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

  public handleLogin: Function = async (account: any, password: any) => {
    await axios.post('http://localhost:8080/api/auth/signin', {
      account: account,
      password: password
    }).then(function (response) {
      //success
      console.log(response);
    }).catch(function (error) {
      //error
      console.log(error);
    });
  }
}
