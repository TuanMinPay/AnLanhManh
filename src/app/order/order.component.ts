import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AppComponent } from "../app.component"
import { UtilService } from '../services/util.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

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

  listProductOrder: any = null;
  
  textError: any = null;

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


  dataTinhThanhPho: any = [];
  dataQuanHuyen: any = [];
  dataPhuongXa: any = [];

  address: any = {
    city: null,
    quanhuyen: null,
    xaphuong: null,
    ordernote: null,
    phone: null,
    addressDetails: null
  }

  addressPost: any = {
    title : null
  }

  selectTinhThanhPho(alm) {
    const that = this;
    var code = alm.split('@alm;')[0];
    that.dataQuanHuyen = [];
    that.dataPhuongXa = [];
    axios.get('/resources/data/quan_huyen.json').then(function (response) {
      that.dataQuanHuyen = response.data.filter(qh => {
        return qh.parent_code == code;
      });
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  selectQuanHuyen(alm) {
    const that = this;
    var code = alm.split('@alm;')[0];
    axios.get('/resources/data/phuong_xa.json').then(function (response) {
      that.dataPhuongXa = response.data.filter(px => {
        return px.parent_code == code;
      });
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  @ViewChild('quanhuyen', { static: false }) quanhuyen: ElementRef;
  @ViewChild('xaphuong', { static: false }) xaphuong: ElementRef;
  @ViewChild('city', { static: false }) city: ElementRef;


  //validate form
  saveAddress() {
    const that = this;
    that.address = {
      city: that.city.nativeElement.value.split('@alm;')[1],
      quanhuyen: that.quanhuyen.nativeElement.value.split('@alm;')[1],
      phuongxa: that.xaphuong.nativeElement.value.split('@alm;')[1],
      ordernote: that.address.ordernote,
      phone: that.address.phone,
      addressDetails: that.address.addressDetails
    }
    if(that.address.city == null || that.address.city == undefined || that.address.quanhuyen == null || that.address.quanhuyen == undefined || that.address.phuongxa == null || that.address.phuongxa == undefined || that.address.phone == null || that.address.addressDetails == null){
      that.textError = "Vui lòng nhập đầy đủ thông tin trước khi thanh toán."
    }
    else{
      var token: any = localStorage.getItem('token');
        that.addressPost = {
          title : `Thành Phố: ${that.address.city}, Quận/Huyện: ${that.address.quanhuyen}, Phường/Xã: ${that.address.phuongxa}, Địa chỉ cụ thể : ${that.address.addressDetails}, Số Điện Thoại: ${that.address.phone}, Ghi Chú: ${that.address.ordernote}`
        }
        axios.post(`${environment.api_url}/api/address`, that.addressPost, { headers: { Authorization: token } })
        .then(function (response){
          console.log("save address success!");
          that.listProductOrder = that.listCart;
          localStorage.setItem('listProductOrder', that.listProductOrder);
          console.log("save product order success!");
        })
        .catch(function (error){
          console.log(error);
        })
      that.textError = null;
    }
  }
  ngOnInit() {
    const that = this;
    this.getProduct();
    axios.get('/resources/data/tinh_thanhpho.json').then(function (response) {
      that.dataTinhThanhPho = response.data;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

}
