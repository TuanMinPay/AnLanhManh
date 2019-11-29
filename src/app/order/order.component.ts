import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AppComponent } from "../app.component"
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public util: UtilService
  ) { }

  listCart: any = null;

  getTotalPriceCart() {
    return this.util.formatPrice(this.listCart.products.reduce((a, b) => parseInt(a) + parseInt(b.price), 0));
  }

  getProduct() {
    const that = this;
    that.listCart = localStorage.getItem('listCart');
    if (that.listCart != null || that.listCart != undefined) {
      that.listCart = localStorage.getItem('listCart');
      that.listCart = JSON.parse(that.listCart);
      console.log(that.listCart);
    } else {
      localStorage.removeItem('listCart');
      that.listCart == null;
      console.log(that.listCart);
    }
  }

  ngOnInit() {
    this.getProduct();

  }

}
