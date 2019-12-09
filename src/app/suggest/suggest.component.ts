import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {

  constructor(
    private util: UtilService
  ) { }

  token: any = localStorage.getItem('token');

  listFood: any;

  listCombo: any;

  getFoodSuggest(){
    const that = this;
    axios.get(`${environment.api_url}/api/suggest/food`, { headers : { Authorization: that.token}})
    .then(function (response){
      that.listFood = response.data.data;
      console.log(that.listFood);
    })
    .catch(function (error){
      console.log(error);
      
    })
  }

  getComboSuggest(){
    const that = this;
    axios.get(`${environment.api_url}/api/suggest/combo`, { headers : { Authorization: that.token}})
    .then(function (response){
      that.listCombo = response.data.data;
      console.log(that.listFood);
    })
    .catch(function (error){
      console.log(error);
    })
  }
  ngOnInit() {
    if(this.token == null || this.token == undefined){
      window.location.href = '/login';
    }
    this.getComboSuggest();
    this.getFoodSuggest();
  }

}
