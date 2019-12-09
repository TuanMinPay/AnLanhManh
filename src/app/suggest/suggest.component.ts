import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { UtilService } from '../services/util.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {

  constructor(
    public util: UtilService,
    private cart: CartService
  ) { }

  token: any = localStorage.getItem('token');

  listFood: any;

  listCombo: any;

  addToCart(prd, type) {
    this.cart.addToCart(prd, type);
  }

  getFoodSuggest() {
    const that = this;
    axios.get(`${environment.api_url}/api/suggest/food`, { headers: { Authorization: that.token } })
      .then(function (response) {
        that.listFood = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getComboSuggest() {
    const that = this;
    axios.get(`${environment.api_url}/api/suggest/combo`, { headers: { Authorization: that.token } })
      .then(function (response) {
        that.listCombo = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  ngOnInit() {
    if (this.token == null || this.token == undefined) {
      window.location.href = '/login?back=/suggest';
    }
    this.getComboSuggest();
    this.getFoodSuggest();
  }

}
