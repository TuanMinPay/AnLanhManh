import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(
    private toastr: ToastrService
  ) { }

  addToCart(product: { id: any; }) {
    var listCart: any = localStorage.getItem('listCart');
    if (listCart == null) {
      listCart = {
        products: [product],
        total: 1
      }
      localStorage.setItem('listCart', JSON.stringify(listCart));
      AppComponent.totalCart = listCart.total;
      this.toastr.success('Đã thêm sản phẩm vào giỏ hàng', 'Thông báo!');
      return;
      // return {
      //   code: 200,
      //   message: "Đã thêm sản phẩm vào giỏ hàng"
      // };
    } else {
      listCart = JSON.parse(listCart);
      if (listCart != null && listCart != undefined) {
        var existsItem = false;
        listCart.products.forEach((prd: { id: any; }) => {
          if (prd.id == product.id) {
            existsItem = true;
          }
        });
        if (!existsItem) {
          listCart.products.push(product);
          listCart.total = listCart.products.length;
          localStorage.setItem('listCart', JSON.stringify(listCart));
          AppComponent.totalCart = listCart.total;
          this.toastr.success('Đã thêm sản phẩm vào giỏ hàng', 'Thông báo!');
          return;
          // return {
          //   code: 200,
          //   message: "Đã thêm sản phẩm vào giỏ hàng"
          // };
        } else {
          this.toastr.error('Sản phẩm đã tồn tại trong giỏ hàng', 'Thông báo!');
          return;
          // return {
          //   code: 400,
          //   message: "Sản phẩm đã tồn tại trong giỏ hàng"
          // };
        }
      }
    }
  }
}
