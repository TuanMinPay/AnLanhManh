import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
import * as _ from 'underscore';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';

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
    cateId: null
  }];

  constructor(
    private router: Router,
    private route: ActivatedRoute
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

  @ViewChild("target", { static: false }) target: ElementRef;

  setPage(page: number) {
    this.currentPage = page;
    this.router.navigate( ['/product/food/list'],  { queryParams: { page: page } });
    this.loadPage(page);
    this.target.nativeElement.scrollIntoView({ block: 'start',  behavior: 'smooth', inline: 'nearest' });
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
  }

  private loadPage(page: number) {
    const that = this;
    axios.get('http://localhost:8080/api/food/list?page=' + page)
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

  foodDetail(id: number) {
    this.router.navigate(["/product-detail/food", id]);
  }
}
