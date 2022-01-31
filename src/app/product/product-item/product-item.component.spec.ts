import { TestBed, async, ComponentFixture} from '@angular/core/testing';

import {ProductItemComponent} from './product-item.component';
import {By} from '@angular/platform-browser';
import {ProductQuantityChange} from "../../model/product-quantity-change";

describe('Product Item Component', () => {

  describe('Integrated Angular Tests', () => {

    let fixture: ComponentFixture<ProductItemComponent>, component: ProductItemComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductItemComponent
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductItemComponent);
      component = fixture.componentInstance;
      component.product = {
        id: 2,
        name: 'Product Test',
        image: 'http://placehold.it/250x250',
        price: 80,
        isOnSale: true,
        quantityInCart: 2
      };
      fixture.detectChanges();
    });

    it('should render product correctly', () => {
      const nameEl = fixture.debugElement.query(By.css('#name'));
      expect(nameEl.nativeElement.textContent).toEqual('Product Test');
    });

    it('pressing increment in cart should increase number', () => {
      let quantityChange: ProductQuantityChange;
      component.quantityChange.subscribe(change => quantityChange = change);
      const incrButtonEl = fixture.debugElement.query(By.css('#incrBtn'));
      incrButtonEl.triggerEventHandler('click', null);
      // @ts-ignore
      expect(quantityChange).toBeDefined();
      // @ts-ignore
      expect(quantityChange.changeInQuantity).toEqual(1);
      // @ts-ignore
      expect(quantityChange.product.id).toEqual(2);
    });

    it('pressing decrement in cart should decrease number', () => {
      let quantityChange: ProductQuantityChange;
      component.quantityChange.subscribe(change => quantityChange = change);
      const decrButtonEl = fixture.debugElement.query(By.css('#decrBtn'));
      decrButtonEl.triggerEventHandler('click', null);
      // @ts-ignore
      expect(quantityChange).toBeDefined();
      // @ts-ignore
      expect(quantityChange.changeInQuantity).toEqual(-1);
      // @ts-ignore
      expect(quantityChange.product.id).toEqual(2);
    });

  });

});
