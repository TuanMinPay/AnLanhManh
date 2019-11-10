import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { async } from 'q';
@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {

  constructor() { }

  listProduct: any = [];

  API_COMBO = "http://localhost:8080/api/combo/1";

  public getSet: Function = async => {
    const that = this;
    axios.get(that.API_COMBO)
    .then(function (response) {
      console.log(response);
      that.listProduct = response.data.data.foodSet;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  ngOnInit() {
    this.getSet();
  }
}
