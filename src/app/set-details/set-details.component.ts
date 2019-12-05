import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { DOCUMENT, Location, isPlatformBrowser } from '@angular/common';
import { UtilService } from '../services/util.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.css']
})
export class SetDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    public util: UtilService,
    private cart: CartService
  ) { }

  dataCombo: any;

  dataCombo2: any;

  quickViewData: any = null;

  openQuickView(food: any) {
    this.quickViewData = food;
  }

  listProduct: any;
  API_COMBO = `${environment.api_url}/api/combo/`;

  id: number;
  public getSet: Function = async => {
    this.id = this.util.getIDfromURL(this.route.snapshot.params['id']);
    const that = this;
    axios.get(`${that.API_COMBO}${that.id}`).then(function (response) {
      that.dataCombo = response.data.data;
      that.productImage = response.data.data.image;
      that.listProduct = response.data.data.foods;
      // console.log(that.dataCombo);
      // console.log(that.listProduct);
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  public getCombo(){
    const that = this;
    axios.get(`${environment.api_url}/api/combo`)
    .then(function (response){
      that.dataCombo2 = response.data.data;
      console.log(that.dataCombo2);
    })
    .catch(function (error){
      console.log(error);
    })
  }

  addToCart(combo) {
    this.cart.addToCart(combo, 'comboId');
  }

  productImage: any;

  ngOnInit() {
    this.getSet();
    this.getCombo();
  }

  ngAfterViewInit() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";

      if (d.getElementById(id)) {
        //if <script id="facebook-jssdk"> exists
        delete (<any>window).FB;
        fjs.parentNode.replaceChild(js, fjs);
      } else {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(this.document, 'script', 'facebook-jssdk'));
  }
}
