import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
   ) {}

  ngOnInit() {
  }

  forgot = true;
  public handleLogin: Function = async (account: any, password: any) => {
    const that = this;
    if(password.length == 0 || account.length == 0 ){
      that.forgot = false;
    }else{
      that.forgot = true;
      await axios.post('http://localhost:8080/api/auth/signin', {
      account: account,
      password: password
    }).then(function (response) {
      //success
      if(response.data.status == 200){
        localStorage.setItem("token", response.data.accessToken);
        //console.log(localStorage.getItem("token"));
        that.router.navigate(['/'])
      }
    }).catch(function (error) {
      //error
      console.log(error);
      // if(error.data.status == 401){
      //   document.getElementById("errorResponse").innerHTML = error.data.message;
      // }
    });
    }
  }
}
