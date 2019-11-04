import { Component, OnInit } from '@angular/core';
import axios from "axios";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public handleRegister: Function = async (name: any, username: any, email: any, password: any, phone: any) => {
    await axios.post('http://localhost:8080/api/auth/signup', {
      name: name,
      username: username,
      email: email,
      password: password,
      phone: phone
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
}
