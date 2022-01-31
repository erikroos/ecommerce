import { Component } from '@angular/core';
import { Product } from "../../model/product";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent  {

  public product: Product;
  public productForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      image: [null, Validators.required],
      isOnSale: [false]
    });
  }

  onSubmit() {
    this.product = Object.assign({}, this.productForm.value);
    this.product.quantityInCart = 0;
    console.log("Product saved: ", this.product);
    this.productService.createProduct(this.product).subscribe(
      (result: any) => {
        console.log("Product " + this.product.name + " successfully created");
        this.productForm.reset();
      },
      err => {
        console.log("Creating product " + this.product.name + " failed");
      }
    );
  }

  // Getters
  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get image() { return this.productForm.get('image'); }
  get isOnSale() { return this.productForm.get('isOnSale'); }
}
