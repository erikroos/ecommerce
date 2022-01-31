import { TestBed, async, ComponentFixture} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {Product} from '../../model/product';
import {By} from '@angular/platform-browser';
import {ProductItemComponent} from "../product-item/product-item.component";

describe('Product List Component', () => {

  describe('Non-Angular Tests', () => {

    it('quantity should change when + or - is pressed', () => {
      const component = new ProductListComponent();
      component.ngOnInit();

      expect(component.products[1].quantityInCart).toEqual(0);

      component.onQuantityChange({changeInQuantity: 2, product: component.products[1]});

      expect(component.products[1].quantityInCart).toEqual(2);

      component.onQuantityChange({changeInQuantity: -1, product: component.products[1]});

      expect(component.products[1].quantityInCart).toEqual(1);
    });

  });

  describe('Integrated Angular Test', () => {

    let fixture: ComponentFixture<ProductListComponent>, component: ProductListComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductListComponent,
          ProductItemComponent
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render three product list items', () => {
      const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));
      expect(productItems.length).toEqual(3);
      const nameEl = productItems[0].query(By.css('#name'));
      expect(nameEl.nativeElement.textContent).toEqual('Test Product - 1');
      const priceEl = productItems[0].query(By.css('#price'));
      expect(priceEl.nativeElement.textContent).toEqual('$ ' + 50);
      const qtyEl = productItems[0].query(By.css('#qty'));
      expect(qtyEl.nativeElement.textContent).toEqual(0 + '');
    });
  });

});
