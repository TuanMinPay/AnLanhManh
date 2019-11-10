import { Component, OnInit, Input } from '@angular/core';
import axios from "axios";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  textName: any = null;
  textPrice: any = null;
  textDescription: any = null;
  linkImage: any = null;
  ngOnInit() {
    const that = this;
    const axios = require('axios');
    axios.get('http://localhost:8080/api/food/6', )
      .then(function (response) {
        if(response.data.status == 200){
          that.textName = response.data.data.name;
          that.textPrice = response.data.data.price;
          that.textDescription = response.data.data.description;
          that.linkImage = response.data.data.image;
        }
        console.log(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }  
}
