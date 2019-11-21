import { Component, OnInit } from '@angular/core';
import axios from 'axios'

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.css']
})
export class SetDetailsComponent implements OnInit {

  constructor() { }

  listProduct: any = [];

  API_COMBO = "http://localhost:9000/api/combo/4";

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
