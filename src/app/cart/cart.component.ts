import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../services/util.service';
import { AppComponent } from '../app.component';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    public util: UtilService,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }

  listCart: any = null;

  textError: any = null;

  token: any = this.localStorage.getItem('token');

  getTotalPriceCart() {
    return this.util.formatPrice(this.listCart.products.reduce((a, b) => parseInt(a) + parseInt(b.price), 0));
  }

  removeAllItem() {
    localStorage.removeItem('listCart');
    this.listCart = null;
    this.toastr.success('Đã xoá trống giỏ hàng', 'Thông báo!');
  }

  removeItem(id: any) {
    this.listCart.products = this.listCart.products.filter((prd: { id: any; }) => {
      return prd.id != id;
    });
    this.listCart.total = this.listCart.products.length;
    AppComponent.totalCart = this.listCart.total;
    if (this.listCart.total == 0) {
      localStorage.removeItem('listCart');
      this.listCart = null;
    } else {
      localStorage.setItem('listCart', JSON.stringify(this.listCart));
    }
    this.toastr.success('Đã xoá sản phẩm khỏi giỏ hàng', 'Thông báo!');
  }

  checkLogin(){
    const that = this;
    if(that.token == null || that.token == undefined){
      that.toastr.error('Vui lòng đăng nhập trước khi thanh toán!');
      setTimeout(() => that.window.location.href = '/login', 1000);
      
    }else{
      that.window.location.href = '/order';
    }
  }

  ngOnInit() {
    const that = this;
    this.listCart = localStorage.getItem('listCart');
    this.listCart = JSON.parse(this.listCart);
  }

}
