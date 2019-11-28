import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.css']
})
export class SetDetailsComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE)
    private router: Router,
    private route: ActivatedRoute) { }

  listProduct: any = [{
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
  API_COMBO = `${environment.api_url}/api/combo/`;

  id: number;
  public getSet: Function = async => {
    this.id = this.route.snapshot.params['id'];
    const that = this;
    axios.get(`${that.API_COMBO}${that.id}`).then(function (response) {
      console.log(response.data.data);
      that.listProduct = response.data.data.foods;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  ngOnInit() {
    this.getSet();
  }

  comboDetail(id: number) {
    this.router.navigate(["product/combo/combo-detail", id]);
  }
}
