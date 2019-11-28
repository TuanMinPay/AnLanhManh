import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.css']
})
export class SetDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private util: UtilService
  ) { }

  listProduct: any = [];
  API_COMBO = `${environment.api_url}/api/combo/`;

  id: number;
  public getSet: Function = async => {
    this.id = this.util.getIDfromURL(this.route.snapshot.params['id']);
    const that = this;
    axios.get(`${that.API_COMBO}${that.id}`).then(function (response) {
      that.listProduct = response.data.data.foods;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  ngOnInit() {
    this.getSet();
  }

}
