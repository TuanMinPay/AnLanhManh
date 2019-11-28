import { Component, OnInit } from '@angular/core';
import { async } from 'q';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cart: CartService,
    private toastr: ToastrService
  ) { }

  listCart: any;

  public checkOut: Function = (async: any) => {
    const that = this;
    that.listCart = localStorage.getItem('listCart');
    that.listCart = JSON.parse(this.listCart);
  }

  removeItem(id: any) {
    this.listCart.products = this.listCart.products.filter(prd => {
      return prd.id != id;
    });
    localStorage.setItem('listCart', JSON.stringify(this.listCart));
    this.toastr.success('Đã xoá khỏi giỏ hàng', 'Thông báo!');
  }
  ngOnInit() {
    this.checkOut();
    console.log
  }

}
