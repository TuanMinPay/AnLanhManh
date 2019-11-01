import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { ContacusComponent } from './contacus/contacus.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContacusComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
