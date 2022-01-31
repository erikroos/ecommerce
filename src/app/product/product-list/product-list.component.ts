import { Component, OnInit } from '@angular/core';
import { Product } from "../../model/product";
import { Observable } from "rxjs";
import { ProductQuantityChange } from "../../model/product-quantity-change";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  template: `
    <app-product-item [product]="product"
                      (quantityChange)="onQuantityChange($event)"
                      *ngFor="let product of products$ | async"></app-product-item>`,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  onQuantityChange(change: ProductQuantityChange) {
    this.productService.onQuantityChange(change);
  }
}
