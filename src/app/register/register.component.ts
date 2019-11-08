import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router"
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(20)]]
    }); 
  } 

  public handleRegister: Function = async (name: any, username: any, email: any, password: any, phone: any) => {
    const that = this;
    that.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
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
      // if(error.response.status == 400){
      //   this.errorMessage = error.response.message;
      // }

      console.log(error.response.data);
      

      
    });
  }
}
