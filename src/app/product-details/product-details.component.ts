import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from "axios";
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';
import { DOCUMENT, Location, isPlatformBrowser } from '@angular/common';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  dataFood: any = {
    id: null,
    name: null,
    description: null,
    image: null,
    price: null,
    carbonhydrates: null,
    protein: null,
    lipid: null,
    xenluloza: null,
    canxi: null,
    iron: null,
    zinc: null,
    vitaminA: null,
    vitaminB: null,
    vitaminC: null,
    vitaminD: null,
    vitaminE: null,
    calorie: null,
    weight: null,
    cateId: null
  };

  constructor(
    private route: ActivatedRoute,
    private cart: CartService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
    private util: UtilService
  ) {
  }

  currentTab: any = 1;

  changeTab(tab) {
    this.currentTab = tab;
  }

  id: number;

  addToCart(product) {
    this.cart.addToCart(product);
  }

  currentURL: any;

  ngOnInit() {
    this.currentURL = this.location.path();
    this.id = this.util.getIDfromURL(this.route.snapshot.params['id']);
    const that = this;
    axios.get(`${environment.api_url}/api/food/${this.id}`).then(function (response: any) {
      if (response.data.status == 200) {
        that.dataFood = response.data.data;
      }
    }).catch(function (error: any) {
      // handle error
      console.log(error);
    });
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
