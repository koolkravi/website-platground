import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IProduct } from '../interface/iproduct';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';

import { Product} from '../model/product'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements  Resolve<Product>{

  constructor(private router:Router, private productService:ProductService) { }

  resolve(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<Product>|Product{
    const prodId = route.params['id'];
    console.log('ProductDetailResolverService');
    return this.productService.getproductById(prodId).pipe(
      catchError(error=>{
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
