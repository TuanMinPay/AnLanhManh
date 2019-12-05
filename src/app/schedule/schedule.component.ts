import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadSchedule()
  }

  dataSchedule : any;
  id: any;
  loadSchedule() {
    const that = this;
    axios.get(`${environment.api_url}/api/schedule/`)
      .then(function (response) {
        if(response.data.status == 200){
        that.dataSchedule = response.data.data;
        console.log(that.dataSchedule );
        }
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }
}
