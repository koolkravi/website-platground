import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import {IProduct} from '../interface/iproduct'
import { Product } from '../model/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productId : number;
  product  = new Product();

  constructor(private route:ActivatedRoute, private router:Router, private productService:ProductService) {
    this.productId=-1;
  }

  ngOnInit(): void {
    this.productId=Number(this.route.snapshot.params['id']);

   this.route.data.subscribe(
      (data)=>{
        this.productId=data['prp'];
      }
   );

    // this.route.params.subscribe(
    //   (params) =>{
    //     this.productId=+params['id'];
    //     console.log(this.productId)
    //     this.productService.getproductById(this.productId).subscribe(
    //       data=>{
    //         console.log(data);
    //       }, error =>{
    //         console.log(error);
    //         this.router.navigate(['/'])
    //       }
    //     )
    //   }
    // )
  }

  onSelectNext(){
    this.productId+=1;
    this.router.navigate(['product-detail', this.productId]);
  }

}
