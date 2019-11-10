import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  dataFood: any ={
    id: null,
    name: null,
    description: null,
    image: null,
    price: null,
    carbonhydrates: null,
    protein: null,
    lipid: null,
    xenluloza: null,
    canxi: null,
    iron: null,
    zinc: null,
    vitaminA: null,
    vitaminB: null,
    vitaminC: null,
    vitaminD: null,
    vitaminE: null,
    calorie: null,
    cateId: null
  };

  constructor(
    private route: ActivatedRoute
  ) {
    
   }

  
  ngOnInit() {
    const that = this;
    const axios = require('axios');

    axios.get('http://localhost:8080/api/food/2'  )
    .then(function (response: any) {
      if(response.data.status == 200){
        that.dataFood = response.data.data;
      }
      console.log(response.data.data);
    })
    .catch(function (error: any) {
      // handle error
      console.log(error);
    });
  }  
}
