import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
import * as _ from 'underscore';
import { environment } from '../../environments/environment';
import { UtilService } from '../services/util.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataFood: any = [{
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
    categories: null,
    cateId: null
  }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilService,
    private cart: CartService
  ) {
  }

  pager: any = [{
    limit: null,
    page: null,
    totalItems: null,
    totalPages: null
  }];

  pageOfItems: any = [];
  currentPage: number = 1;
  page: any;
  pages: any = [];
  startPage: number; endPage: number;

  dataCate: any = [{
    id: null,
    name: null,
    parentId: null
  }];

  dataCate2: any = [];
  id: any = 1;
  @ViewChild("target", { static: false }) target: ElementRef;

  setPage(page: number) {
    this.currentPage = page;
    this.router.navigate(['/pl/list'], { queryParams: { page: page } });
    this.loadPage(page);
    this.target.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
  }

  ngOnInit() {
    this.page = this.route.snapshot.queryParamMap.get('page');
    if (this.page == null) {
      this.page = 1;
    } else {
      this.page = parseInt(this.page);
    }
    this.currentPage = this.page;
    this.loadPage(this.page);

    this.loadCategory(this.id);
    this.chooseCategoryParent(this.id);

    this.chooseProduct(this.id);
  }

  addToCart(food) {
    this.cart.addToCart(food);
  }

  chooseProduct(id) {
    const that = this;
    axios.get(`${environment.api_url}/api/category/${id}`).then(function (response) {
      that.dataFood = response.data.data.foods;
    }).catch(function (error: any) {
      console.log(error);
    });
  }

  childCategory: any;

  chooseCategoryParent(id) {
    const that = this;
    axios.get(`${environment.api_url}/api/category/parent/${id}`)
      .then(function (response) {
        if (that.childCategory = id) {
          that.dataCate2 = response.data.data;
        }
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }

  loadCategory(id) {
    const that = this;
    axios.get(`${environment.api_url}/api/category/parent/${id}`)
      .then(function (response) {
        that.dataCate = response.data.data;
        that.chooseCategoryParent(that.dataCate[0].id);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }

  private loadPage(page: number) {
    const that = this;
    axios.get(`${environment.api_url}/api/food/list?page=${page}`)
      .then(function (response) {
        if (response.data.status == 200) {
          that.dataFood = response.data.data;
          that.pager = response.data.restPagination;
          that.pageOfItems = Math.ceil(response.data.restPagination.totalItems / response.data.restPagination.limit);
          if (that.pageOfItems <= 10) {
            that.startPage = 1;
            that.endPage = that.pageOfItems;
          } else {
            if (that.currentPage <= 6) {
              that.startPage = 1;
              that.endPage = 10;
            } else if (that.currentPage + 4 >= that.pageOfItems) {
              that.startPage = that.pageOfItems - 9;
              that.endPage = that.pageOfItems;
            } else {
              that.startPage = that.currentPage - 5;
              that.endPage = that.currentPage + 4;
            }
          }
          that.pages = _.range(that.startPage, that.endPage + 1);
        }

        console.log(response.data.data);
        console.log(response.data.restPagination);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }
}
