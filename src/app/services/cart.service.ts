import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }


  addToCart(product) {
    var listCart: any = localStorage.getItem('listCart');
    var userId: any = localStorage.getItem('id');
    const that = this;
    if (listCart == null) {
      listCart = {
        'food': [
          {
            'userId': userId,
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'image': product.image,
            'price': product.price,
            'carbonhydrates': product.carbonhydrates,
            'protein': product.protein,
            'lipid': product.lipid,
            'xenluloza': product.xenluloza,
            'canxi': product.canxi,
            'iron': product.iron,
            'zinc': product.zinc,
            'vitaminA': product.vitaminA,
            'vitaminB': product.vitaminB,
            'vitaminC': product.vitaminC,
            'vitaminD': product.vitaminD,
            'vitaminE': product.vitaminE,
            'calorie': product.calorie,
            'weight': product.weight,
            'status': product.status
          }
        ]
      }
      localStorage.setItem('cart', '1');
      console.log(listCart);
    } else {
      listCart = JSON.parse(listCart);
      if (listCart != null && listCart != undefined) {
        var existsItem = false;
        var totalCart = listCart.food.length;
        var cart = localStorage.getItem('cart');
        if (cart == null) {
          localStorage.setItem("cart", totalCart);
        } else {
          localStorage.setItem("cart", totalCart);
        }
        for (var i = 0; i < listCart.food.length; i++) {
          if(listCart.food[i].id == product.id){
            existsItem = true;
            console.log("food da ton tai!")
            return;
          }
        }
        if (!existsItem) {
          listCart.food.push({
            'userId': userId,
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'image': product.image,
            'price': product.price,
            'carbonhydrates': product.carbonhydrates,
            'protein': product.protein,
            'lipid': product.lipid,
            'xenluloza': product.xenluloza,
            'canxi': product.canxi,
            'iron': product.iron,
            'zinc': product.zinc,
            'vitaminA': product.vitaminA,
            'vitaminB': product.vitaminB,
            'vitaminC': product.vitaminC,
            'vitaminD': product.vitaminD,
            'vitaminE': product.vitaminE,
            'calorie': product.calorie,
            'weight': product.weight,
            'status': product.status
          });
          localStorage.setItem("cart", totalCart + 1);
        }
      }
      //console.log(product.name);
    }
    localStorage.setItem('listCart', JSON.stringify(listCart));
    var abc = localStorage.getItem('listCart');
    console.log(abc);
  }
}
