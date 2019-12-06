import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ate',
  templateUrl: './ate.component.html',
  styleUrls: ['./ate.component.css']
})
export class AteComponent implements OnInit {

  constructor() { }

  listFood: any [];

  textError: any = null;

  isShowForm = false;

  getFood(){
    const that = this;
    axios.get(`${environment.api_url}/api/combo`)
    .then(function (response){
      console.log(response);
      that.listFood = response.data.data;
    })
    .catch(function (error){
      console.log(error);
      
    })
  }

  showForm(){
    const that = this;
    that.isShowForm = true;
  }

  back(){
    this.isShowForm = false;
  }

  ngOnInit() {
    this.getFood();
  }

}
