import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
   ) {}

  ngOnInit() {
  }

  public handleRegister: Function = async (name: any, username: any, email: any, password: any, phone: any) => {
    const that = this;
    await axios.post('http://localhost:8080/api/auth/signup', {
      name: name,
      username: username,
      email: email,
      password: password,
      phone: phone
    }).then(function (response) {
      console.log(response);
      if(response.data.status == 201){
          that.router.navigate(['/login'])
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
}
