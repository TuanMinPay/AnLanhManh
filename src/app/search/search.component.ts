import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { UtilService } from '../services/util.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private cart: CartService
  ) { }

  listFood: any;

  listCombo: any;

  addToCart(food, type) {
    this.cart.addToCart(food, type);
    //console.log(food);
  }

  searchFood() {
    const that = this;
    axios.get(`${environment.api_url}/api/food/list?search=${that.keyword}&page=1`)
      .then(function (response) {
        console.log(response);
        that.listFood = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  searchCombo(){
    const that = this;
    axios.get(`${environment.api_url}/api/combo/list?search=${that.keyword}&page=1`)
      .then(function (response) {
        console.log(response);
        that.listCombo = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  keyword: any;
  ngOnInit() {
    this.keyword = this.route.snapshot.queryParamMap.get("q");
    this.searchFood();
    this.searchCombo();
  }

}
