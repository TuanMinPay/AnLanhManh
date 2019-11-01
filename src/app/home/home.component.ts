import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  outProductTab: any = 'tab_one';

  outProductData: any = [{
    name: 'Mango',
    tab: 'tab_one',
    groupId: 1
  }, {
    name: 'Vegetables',
    tab: 'tab_two',
    groupId: 2
  }, {
    name: 'Fruits',
    tab: 'tab_three',
    groupId: 3
  }, {
    name: 'Juice',
    tab: 'tab_four',
    groupId: 4
  }, {
    name: 'Meats',
    tab: 'tab_five',
    groupId: 5
  }];

  public chooseTabOutProduct: Function = (tab) => {
    this.outProductTab = tab;
  }

  ngOnInit() {
  }

}
