import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import axios from "axios";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  formatter = new Intl.NumberFormat('en-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });
  
  dataFood: any = {
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
    weight: null,
    cateId: null
  };

  constructor(
    private route: ActivatedRoute,
    private cart: CartService
  ) {
  }

  id: number;

  addToCart(product) {
    this.cart.addToCart(product);
  }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    const that = this;
    axios.get('http://localhost:9000/api/food/' + this.id).then(function (response: any) {
      if (response.data.status == 200) {
        that.dataFood = response.data.data;
      }
      console.log(response.data.data);
    }).catch(function (error: any) {
      // handle error
      console.log(error);
    });
  }

}
