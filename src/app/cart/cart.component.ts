import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../services/util.service';
import { AppComponent } from '../app.component';
import axios from 'axios';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    public util: UtilService
  ) { }

  listCart: any = null;

  textError: any = null;

  getTotalPriceCart() {
    return this.util.formatPrice(this.listCart.products.reduce((a, b) => parseInt(a) + parseInt(b.price), 0));
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

  dataTinhThanhPho: any = [];
  dataQuanHuyen: any = [];
  dataPhuongXa: any = [];

  ngOnInit() {
    const that = this;
    this.listCart = localStorage.getItem('listCart');
    this.listCart = JSON.parse(this.listCart);

    axios.get('/resources/data/tinh_thanhpho.json').then(function (response) {
      that.dataTinhThanhPho = response.data;
      // handle success
      console.log(response.data);
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

}
