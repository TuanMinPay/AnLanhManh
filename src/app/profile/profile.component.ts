import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any ) {
  }

  token: any = this.localStorage.getItem('token');

  listProductOrder: any [];

  editAddress:boolean = false;

  userDetails: any;

  userAddress: any;

  addressId: any = [];

  myInfo: any;

  listCart: any = null;

  textError: any = null;

  API_PROFILE = `${environment.api_url}/api/user-profile`;

  API_GETME = `${environment.api_url}/api/auth/me`;

  API_CHANGEPASSWORD = `${environment.api_url}/api/auth/password/change`;

  dataTinhThanhPho: any = [];
  dataQuanHuyen: any = [];
  dataPhuongXa: any = [];

  address: any = {
    city: null,
    quanhuyen: null,
    xaphuong: null,
    addressDetails: null,
    phone: null
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

  public getMe: Function = () => {
    const that = this;
    axios.get(that.API_GETME, { headers: { Authorization: that.token } }).then(function (response) {
      that.myInfo = response.data.data;
      //that.getProfile(`${that.API_PROFILE}/${that.myInfo.id}`);
      //console.log(that.myInfo);
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  public getAddress() {
    const that = this;
    axios.get(`${environment.api_url}/api/address`, {headers : { Authorization : that.token}})
    .then(function (response){
      //console.log(response);
      that.addressId = response.data.data[0].id;
      //console.log(that.addressId)
      axios.get(`${environment.api_url}/api/address/${that.addressId}`, {headers : { Authorization : that.token}})
      .then(function (response){
        that.userAddress = response.data.data;
        console.log("Get address success!");
      })
      .catch(function (error){
        console.log(error);
      })
    })
    .catch(function (error){
      console.log(error);
    })
  }

  getLatestProfile(){
    const that = this;
    axios.get(`${environment.api_url}/api/user-profile/latest`, { headers: { Authorization: that.token } })
    .then(function (response){
      //console.log(response.data.data);
      that.userDetails = response.data.data;
      that.getAddress();
    })
    .catch(function (error){
      console.log(error);
    })
  }

  public changePassword: Function = async (oldPassword: any, password: any, confirmPassword: any) => {
    const that = this;
    if (oldPassword.length == 0 || password.length == 0 || confirmPassword.length == 0) {
      that.textError = "Vui lòng nhập thông tin"
    } else if (password.length < 6) {
      that.textError = "Mật khẩu phải lớn hơn 6 kí tự!"
    } else if (password.length != confirmPassword.length) {
      that.textError = "Mật khẩu không trùng nhau !"
    } else {
      that.textError = null;
      axios.put(that.API_CHANGEPASSWORD,
        {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: confirmPassword
        }, { headers: { Authorization: that.token } }).then(function (response) {
          if (response.data.status == 200) {
            that.window.location.href = '/profile';
          }
          console.log(response)
        }).catch(function (error) {
          if (error.response.data.status == 401) {
            that.textError = error.response.data.message;
          } else {
            that.textError = null;
          }
        });
    }

  }

  hideFormEdit(){
    this.editAddress = false;
  }

  showFormEdit(){
    this.editAddress = true;
  }

  saveAddress() {
    const that = this;
    that.address = {
      city: that.city.nativeElement.value.split('@alm;')[1],
      quanhuyen: that.quanhuyen.nativeElement.value.split('@alm;')[1],
      phuongxa: that.xaphuong.nativeElement.value.split('@alm;')[1],
      phone: that.address.phone,
      addressDetails: that.address.addressDetails
    }
    if(that.address.city == null || that.address.city == undefined || that.address.quanhuyen == null || that.address.quanhuyen == undefined || that.address.phuongxa == null || that.address.phuongxa == undefined || that.address.addressDetails == null){
      that.textError = "Vui lòng nhập đầy đủ thông tin."
    }
    else{
        that.addressPost = {
          title : `Thành Phố: ${that.address.city}, Quận/Huyện: ${that.address.quanhuyen}, Phường/Xã: ${that.address.phuongxa}, Địa chỉ cụ thể : ${that.address.addressDetails}, Số Điện Thoại: ${that.address.phone}`
        }
        axios.put(`${environment.api_url}/api/address/${that.addressId}`, that.addressPost, { headers: { Authorization: that.token } })
        .then(function (response){
          console.log("save address success!");
          window.location.href = '/profile';
        })
        .catch(function (error){
          console.log(error);
        })
      that.textError = null;
    }
  }

  getProductOrder(){
    // const that = this;
    // that.listProductOrder = JSON.parse(localStorage.getItem('listProductOrder'));
    // console.log(that.listProductOrder);
  }

  logout() {
    var token = this.localStorage.getItem('token');
    if (token != null || token != undefined) {
      this.localStorage.removeItem('token');
      this.localStorage.removeItem('listCart');
      this.window.location.href = '/login';
    }
  }

  ngOnInit() {
    if(this.token == null || this.token == undefined){
      window.location.href = '/login'
    }
    const that = this;
    this.getMe();
    this.getLatestProfile();
    axios.get('/resources/data/tinh_thanhpho.json').then(function (response) {
      that.dataTinhThanhPho = response.data;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
    this.getProductOrder();
  }
}
