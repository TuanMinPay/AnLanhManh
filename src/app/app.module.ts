import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContacusComponent } from './contacus/contacus.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SetComponent } from './set/set.component';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,ConfirmEqualValidatorDirective,
    HomeComponent,
    AboutComponent,
    ContacusComponent,
    ProductComponent,
    CartComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
