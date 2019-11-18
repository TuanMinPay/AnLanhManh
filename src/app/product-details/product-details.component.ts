import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import axios from "axios";

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
    cateId: null
  };

  constructor(
    private route: ActivatedRoute
  ) {
  }

  id: number;


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    const that = this;

    axios.get('http://localhost:9000/api/food/' + this.id).then(function (response: any) {
      if (response.data.status == 200) {
        that.dataFood = response.data.data;
      }
      console.log(response.data.data);
    }).catch(function (error: any) {
      // handle error
      console.log(error);
    });
  }

}
