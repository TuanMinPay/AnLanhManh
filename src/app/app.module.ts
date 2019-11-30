import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContacusComponent } from './contacus/contacus.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SetComponent } from './set/set.component';
import { SetDetailsComponent} from './set-details/set-details.component';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { StepComponent } from './step/step.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,ConfirmEqualValidatorDirective,
    HomeComponent,
    AboutComponent,
    ContacusComponent,
    CartComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SetComponent,
    SetDetailsComponent,
    StepComponent,
    ProductComponent,
    ProductDetailsComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
