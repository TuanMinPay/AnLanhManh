import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { Router } from "@angular/router"

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any)
  { }
  textError: any = null;

  ngOnInit() {
  }

  goHome() {
    const that = this;
    that.window.location.href = '/home';
  }
}
