import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router"
import { FormBuilder, FormGroup, Validators, ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
   ) {
     
   }



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['',  Validators.required]
    }); 
  }

  

  get f() { return this.registerForm.controls; }

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
      // if(error instanceof )
      if(error.response.data.status == 400){
        console.log(error.response.data.errors);
        document.getElementById("errorName").innerHTML = error.response.data.errors;
      }
      

      // document.getElementById("errorUsername").innerHTML = error.response.data;

      // document.getElementById("errorEmail").innerHTML = error.response.data;

      // document.getElementById("errorPassword").innerHTML = error.response.data;

      // document.getElementById("errorPhone").innerHTML = error.response.data;
        
    });
  }
}
