import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
import * as _ from 'underscore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})

export class SetComponent implements OnInit {


  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  dataCate: any = [{
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

  // API_COMBO = `${environment.api_url}/api/combo`;

  pager: any = [{
    limit: null,
    page: null,
    totalItems: null,
    totalPages: null
  }];

  id: number;
  pageOfItems: any = [];
  currentPage: number = 1;
  page: any;
  pages: any = [];
  startPage: number; endPage: number;

  @ViewChild("target", { static: false }) target: ElementRef;

  setCombo(page: number) {
    this.currentPage = page;
    this.router.navigate(['/product/combo'], { queryParams: { page: page } });
    this.loadCombo(page);
    this.target.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
  }

  public loadCombo(page: number) {
    const that = this;
    axios.get(`${environment.api_url}/api/combo?page=${page}`).then(function (response) {
      if (response.data.status = 200) {
        that.dataCate = response.data.data;
        // that.pager = response.data.restPagination;
        // that.pageOfItems = Math.ceil(response.data.restPagination.totalItems / response.data.restPagination.limit);
        // if (that.pageOfItems <= 10) {
        //   that.startPage = 1;
        //   that.endPage = that.pageOfItems;
        // } else {
        //   if (that.currentPage <= 6) {
        //     that.startPage = 1;
        //     that.endPage = 10;
        //   } else if (that.currentPage + 4 >= that.pageOfItems) {
        //     that.startPage = that.pageOfItems - 9;
        //     that.endPage = that.pageOfItems;
        //   } else {
        //     that.startPage = that.currentPage - 5;
        //     that.endPage = that.currentPage + 4;
        //   }
        // }
        // that.pages = _.range(that.startPage, that.endPage + 1);
      }
      console.log(response.data.data);
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  ngOnInit() {
    this.page = this.route.snapshot.queryParamMap.get('page');
    if (this.page == null) {
      this.page = 1;
    } else {
      this.page = parseInt(this.page);
    }
    this.currentPage = this.page;
    this.loadCombo(this.page);
  }

  comboDetail(id: number) {
    this.router.navigate(["/product/combo/combo-detail", id]);
  }
}
