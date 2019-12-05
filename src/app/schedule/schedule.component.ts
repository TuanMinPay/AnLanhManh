import { Component, OnInit, Inject } from '@angular/core';
import axios from "axios";
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any ) { }

  token: any = this.localStorage.getItem('token');

  ngOnInit() {
    this.loadSchedule()
  }

  dataSchedule : any;
  id: any;
  public loadSchedule: Function = () => {
    const that = this;
    axios.get(`http://localhost:9000/api/suggest/schedule`, { headers: { Authorization: that.token } })
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
