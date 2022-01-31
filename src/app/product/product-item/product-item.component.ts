import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../model/product";
import {ProductQuantityChange} from "../../model/product-quantity-change";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  @Input() public product! : Product;
  @Output() quantityChange: EventEmitter<ProductQuantityChange>;

  public productClasses!: {};

  constructor() {
    this.quantityChange = new EventEmitter<ProductQuantityChange>();
  }

  incrementInCart() {
    this.quantityChange.emit({product: this.product, changeInQuantity: 1});
  }

  decrementInCart() {
    if (this.product.quantityInCart > 0) {
      this.quantityChange.emit({product: this.product, changeInQuantity: -1});
    }
  }
}
