import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../interface/iproduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct
  constructor() {
  }

  ngOnInit(): void {
  }




}
