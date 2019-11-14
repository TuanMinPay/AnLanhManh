import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  dataFood: any =[{
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

  pageOfItems = [];
  
  page : number;
  
  ngOnInit() {
    const that = this;
    that.page = that.route.snapshot.params['page'];
    that.route.queryParams.subscribe(x => that.loadPage(x.page || 1));
    
  }  

  private loadPage(page: any){
    const that = this;
    axios.get<any>('http://localhost:8080/api/food/' + that.page)
    .then(function (response) {
      if(response.data.status == 200){
        that.dataFood = response.data.data.content;
        that.pager = response.data.restPagination;
        // that.pageOfItems = response.data.restPagination
      }
      console.log(response.data.data.content);
      console.log(response.data.restPagination);
    })
    .catch(function (error: any) {
      // handle error
      console.log(error);
    });
  }

   foodDetail(id: number){
    this.router.navigate(["/product-detail/food", id]);
  }
}
