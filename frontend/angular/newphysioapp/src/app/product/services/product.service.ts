import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product }from  '../model/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get('data/products.json').pipe(
      map(data => {
        const productsArray:Array<Product>=[];
        const i:number=1;
        for (const id in data){
            productsArray.push(data[id])
        }
        return productsArray;
      })
    )
  }

 getproductById(id:number){
    return this.getAllProducts().pipe(
      map(
        array=>{
          //throw new Error("some error occured");
          return array.find(p=>p.id===id)
        }
      )
    )
 }


  test(){
    const productsArray:Array<any>=[{"id":10,"name":"ravi"},{"id":11,"name":"ravi2"}];
    for (let prop in productsArray) {
      console.log(productsArray[prop]);
  }
  }

}
