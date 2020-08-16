import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { IProduct } from '../interface/iproduct'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Today = new Date();
  type = '';
  searchType = '';
  SortByParam = '';
  sortDirection='desc';

  // Properties: Array<any>;
  // Properties: any;
  Properties: Array<IProduct>;

  constructor(private router: Router, private productService: ProductService) {
    this.Properties = [];
  }

  ngOnInit(): void {
    /* this.http.get('data/products.json').subscribe(
      data => {
        console.log(data)
        this.Properties=data;
      }
    ) */
    this.productService.getAllProducts().subscribe(
      data => {
        this.Properties = data;
      }, error => {
        console.log(error)
      }
    )
  }


  addProduct() {
    this.router.navigate(['/product-add'])
  }

  onTypeFilter() {
    this.searchType = this.type;
  }
  onTypeFilterClear() {
    this.searchType = '';
    this.type = '';
  }

  onSortDirection(){
    console.log(this.sortDirection);
    if (this.sortDirection==='desc'){
      this.sortDirection='asc';
    } else if (this.sortDirection==='asc'){
      this.sortDirection='desc';
    }
  }


}
