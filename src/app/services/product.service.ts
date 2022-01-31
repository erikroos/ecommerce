import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { throwError as ObservableThrow } from "rxjs";
import { of as ObservableOf } from "rxjs";

import { Product } from "../model/product";
import { ProductQuantityChange } from "../model/product-quantity-change";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Product[];

  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Test Product - 1',
        image: 'https://via.placeholder.com/150x150',
        price: 50,
        isOnSale: true,
        quantityInCart: 0
      },
      {
        id: 2,
        name: 'Test Product - 2',
        image: 'https://via.placeholder.com/150x150',
        price: 150,
        isOnSale: false,
        quantityInCart: 0
      },
      {
        id: 3,
        name: 'Test Product - 3',
        image: 'https://via.placeholder.com/150x150',
        price: 250,
        isOnSale: true,
        quantityInCart: 0
      }
    ];
  }

  getProducts(): Observable<Product[]> {
    return ObservableOf(this.products);
  }

  createProduct(product: Product): Observable<any> {
    let existingProduct = this.products.find(each => each.name === product.name);
    if (existingProduct) {
      return ObservableThrow(() => new Error("Product with name " + product.name + " already exists!"));
    }
    this.products.push(product);
    return ObservableOf({msg: "Product " + product.name + " successfully created"});
  }

  onQuantityChange(change: ProductQuantityChange): Observable<Product> {
    let existingProduct = this.products.find(each => each.id === change.product.id);
    existingProduct.quantityInCart += change.changeInQuantity;
    return ObservableOf(existingProduct);
  }
}
