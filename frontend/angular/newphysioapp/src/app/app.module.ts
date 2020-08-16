import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

import {ProductService } from './product/services/product.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {UserService } from './login/services/user.service';

import {AlertifyService } from './services/alertify.service';
import { AuthenticationService } from './login/services/authentication.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {  ProductDetailResolverService  } from './product/resolver/product-detail-resolver.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe'

export const appRoutes: Routes = [
  {path:'', component: ProductListComponent},
  {path:'product-detail/:id', component: ProductDetailComponent, resolve:{prp:ProductDetailResolverService}},
  {path:'product-add', component: ProductAddComponent},

  {path:'login', component: LoginComponent},
  {path:'**', component: ProductListComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductListComponent,
      NavBarComponent,
      ProductDetailComponent,
      ProductAddComponent,
      LoginComponent,
      FilterPipe,
      SortPipe
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ProductService, UserService, AlertifyService, AuthenticationService
  ,ProductDetailResolverService],
  bootstrap: [AppComponent]

})
export class AppModule { }
