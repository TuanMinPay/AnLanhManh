import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { async } from 'q';
@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})

export class SetComponent implements OnInit {
 
  
  formatter = new Intl.NumberFormat('en-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });
  
  constructor() { }

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

  API_COMBO = "http://localhost:9000/api/combo";

  id: number;

  public getSet: Function = async => {
    const that = this;
    axios.get(that.API_COMBO + that.id)
    .then(function (response) {
      console.log(response);
      that.dataCate = response.data.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  ngOnInit() {
    this.getSet();
  }
}
