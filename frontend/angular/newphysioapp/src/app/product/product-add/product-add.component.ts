import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['/'])
  }

}
