# Angular - set up your environment for Angular development using the Angular CLI tool

## Prerequisites
Angular version - 10.0.5 required
    "node": ">= 10.13.0",
    "npm": ">= 6.11.0",

### 1. Node.js
Angular requires a current, active LTS, or maintenance LTS version of Node.js
- Latest LTS Version: 12.18.3 (includes npm 6.14.6)
- node-v12.18.3-x64.msi
```
node -v
v12.18.3
```

### 2. npm package manager
Angular, the Angular CLI, and Angular applications depend on npm packages for many features and functions
- To download and install npm packages, you need an npm package manager
- npm client command line interface, which is installed with Node.js by default
```
npm -v
6.14.6
```

## Step 1: Install the Angular CLI
Angular CLI is used to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment

```
npm install -g @angular/cli
```

```
ng --version or ng v 
```

## Step 2: Create a workspace and initial application
To create a new workspace and initial starter app, Run the  CLI command ng
```
ng new newphysioapp --strict
```
The Angular CLI installs the necessary Angular npm packages and other dependencies
The CLI creates a new workspace and a simple Welcome app, ready to run

### 2.1 Overall flow of appliactionn

```
main.ts
   |
app.module.ts (responsible for bootstraping of application)
   |
app.component.ts  (only one Root Component and other components that we create will be child component of root component)

index.html (various components are dynamically loaded)
   |
app.component.ts 
   |
_______________________
|                     |
app.component.html app.component.css  
```


## Step 3: Run the application
The Angular CLI includes a server, so that you can build and serve your app locally
```
cd newphysioapp
ng serve --open
```
The ng serve command launches the server, watches your files, and rebuilds the app as you make changes to those files.
The --open (or just -o) option automatically opens your browser to http://localhost:4200/

## Step 4: Install vscode  extensions 

angular essential by publisher:"John Papa" vetsion 9
auto rename tag
Bracket Pair Colorizer 2
abgular files   (help to create angular components, services etc.)
IntelliSense for CSS class names in HTML

## Step 6: Create home page of application
- Create a component product-card.component.ts
- Add newly created component into app.module.ts  (will be automatically added while using ng generate component )
- Add into app.component.html

```
 ng generate component product/product-list
 or 
 ng g c product/product-card 
 ng g c product/product-list  
 ng g c nav-bar  
```

### 6.1 Component Overall flow

```
	 DataBase
		^
		|
		|
						Template(Html. css)  -------------> Directives (Structural, Attribute)
	   Backend API				     (view)
		|			  (	   			  )
		|			 (				   )
		|			(				    )	
	Service <-------------> Component 
						  (view model)


Template and view communicate using Data binding (String Interpolation, Property binding, Event Binding, Two way binding)
```

## Step 7 :  Install bool strap

### bootstrap, jquery and popper.js
```
npm install bootstrap --save 
``` 
Note: "bootstrap": "^4.5.2" -> added automatically into package.json 

optional JavaScript dependencies (jQuery and Popper.js).
```
npm install jquery --save  
npm install popper.js --save
```

Note: "jquery": "^3.5.1" and "popper.js": "^1.16.1"  ->added automatically into package.json 

### Add below manually into angular.json 
```
"node_modules/bootstrap/dist/css/bootstrap.min.css"
```

## Step 7 :  Install fortawesome
```
npm install --save @fortawesome/fontawesome-free
```
note: "@fortawesome/fontawesome-free": "^5.14.0"  -> added automatically into package.json 

### Add below manually into angular.json 
```
"node_modules/font-awesome/css/font-awesome.css",
```


## Step 8 : product-card.component.ts
add below
```
Property: any={
  id:1,
  type: "Tshirt",
  price: "USD 415.00"
}
``` 
in product-card.component.html
String Interpolation
```
<h1>{{Property.id}}</h1>
<h1>{{Property.type}}</h1>
<h1>{{Property.price}}</h1>
```

## Step 8 : product-listcomponent.ts

### move below from card to list component
```
Property: any={
  id:1,
  type: "Tshirt",
  price: "USD 415.00"
}
```

### in product-list.component.html
add below
```
  <div *ngFor="let property of Properties" class="col-md-3">
	<app-product-card></app-product-card>
  </div>
```

### pass value of propety from list component (parent) to card component (child) using Input decorator

property binding
in product-list.component.html
```
  <div *ngFor="let property of Properties" class="col-md-3">
	<app-product-card [property]="property"></app-product-card>
  </div>
```

## Step 9: Create nave bar 
add html code into nav-bar.component.html

## Step 10: Routing to Product detail page
in app.module.ts add below
```
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  {path:'', component: ProductListComponent},
  {path:'product-detail/:id', component: ProductDetailComponent}
]

RouterModule.forRoot(appRoutes)

```
in app.component.html add below
```
<router-outlet></router-outlet>
```

in product-card.component.html add routerLink as below
```
<a routerLink="/product-detail/{{product.id}}"><img src="{{product.imageUrl}}"></a>
```

in nav-bar.component.html add routerLink as below
```
  <a routerLink="/"><img src="assets/images/150-50Logo.png" class="logo"></a>
```

## Step 11:  Access ID from URL into product-detail.component.ts
add ActivatedRoute into  product-detail.component.ts
```
 public productId : number;
 constructor(private route:ActivatedRoute) 
 this.productId=this.route.snapshot.params['id'];
 
```

## Step 12: add a add product button

```
ng g c product/product-add
```
add beow into app.module.ts
```
 {path:'product-add', component: ProductListComponent}
```
add a button into product-add.component.html
```
 <button class ="btn btn-primary">Back </button>
```

add below into product-add.component.ts
```
  constructor(private router:Router) { }
  onBack(){
    this.router.navigate(['/'])
  }
```
event binding (click) into product-add.component.html
```
 <button (click) = "onBack()" class ="btn btn-primary">Back </button>
</p>
```

in product-list.component.html add below

```
  <button (click)="addProduct()" class="btn btn-primary">Add Product </button>
```
in product-list.component.ts add below
```
constructor(private router: Router) { }
addProduct(){
  this.router.navigate(['/product-add'])
}
```

in app.module.ts add below
```
 {path:'product-add', component: ProductAddComponent}
```

## Step 13: Add next button into product details page
in product-detail.component.html
```
<button class ="btn btn-primary"> next page </button>
```
in product-detail.component.ts
```
constructor(private route:ActivatedRoute, private router:Router) 
this.productId=Number(this.route.snapshot.params['id']);
 onSelectNext(){
    this.productId+=1;
    this.router.navigate(['product-detail', this.productId]);
  }

```
add below 
```
this.route.params.subscribe(
      (params) =>{
        this.productId=+params['id'];
      }
    )
```

## Step 14:  Reactive forms login page
```
ng g c login
```
### 14.1 app.module.ts : add below
```
{path:'login', component: LoginComponent},
```

### 14.2 nav-bar.component.html : add below
```
 <li><a routerLink="/login">Log In</a></li>
```
### 14.3 update login.component.html and login.component.css
```
 <hr id="Indicator" #Indicator>
 <span (click)="login()">Login</span>
 <span (click)="register()">Register</span>
```
### 14.4  login.component.ts
```
  @ViewChild('LoginForm') LoginForm?: ElementRef;
  @ViewChild('RegForm') RegForm?: ElementRef;
  @ViewChild('Indicator') Indicator: ElementRef | undefined;
  
  
  login(){
    console.log("login");
    if(this.LoginForm && this.RegForm && this.Indicator) {
      this.LoginForm.nativeElement.style.transform = "translateX(300px)";
      this.RegForm.nativeElement.style.transform = "translateX(300px)";
      this.Indicator.nativeElement.style.transform = "translateX(0px)";
    }

  }

  register() {
    console.log("register");
    if(this.LoginForm && this.RegForm && this.Indicator) {
    this.LoginForm.nativeElement.style.transform = "translateX(0px)";
    this.RegForm.nativeElement.style.transform = "translateX(0px)";
    this.Indicator.nativeElement.style.transform = "translateX(100px)";
    }
  }
```

## Step 14: HTTP calls
```
add new folder and file  : data -> products.json
copy products json here

```
in app.module.ts, add below
```
import {HttpClientModule} from '@angular/common/http';
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
```
in product-list.component.ts add below add HttpClientModule
```
 Properties: Array<any>;
 constructor(private router: Router, private http:HttpClient) {
    this.Properties =[];
  }

  ngOnInit(): void {
    this.http.get('data/products.json').subscribe(
      data => console.log(data)
    )
  }
```
in angular.json add src/data   as  below
```
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/data"

],
```

## Step 15: Using Service
```
ng g service services/product

```
IN app.module.ts 
```
import {ProductService } from './services/product.service';
 providers: [ProductService],
```

update product.service.ts
```
import { HttpClient } from '@angular/common/http';
constructor(private http:HttpClient) { }
getAllProducts(){
return this.http.get('data/products.json')
}
```

inject service into product-list.component.ts
```
import {ProductService} from 'src/app/services/product.service';
constructor(private router: Router, private productService: ProductService) {
	this.Properties =[];
}
 

ngOnInit(): void {
   this.productService.getAllProducts().subscribe(
      data => {
        console.log(data)
        this.Properties=data;
      }, error => {
        console.log(error)
      }
    )
}
```

## Step 16: Using pipes   ???

in product.service.ts
```
  getAllProducts(){
    return this.http.get('data/products.json').pipe(
      map(data => {
        const productsArray:Array<any>=[];
        for (const id in data){
          if(data.hasOwnProperty(id)){
            productsArray.push(id)
          }
        }
        return productsArray;
      })
    )
  }
```
in product-list.component.ts
```
Properties: Array<any>;
```

## Step 17: create an Interface
```
ng g interface product/interface/IProduct
```
```
export interface IProduct {

  id: number;
  type: string;
  price: string;
  imageUrl: string;

}
```
update product-list.component.ts
```
Properties: Array<IProduct>;
```

update  product.service.ts
```
  getAllProducts(): Observable<IProduct[]>{
    return this.http.get('data/products.json').pipe(
      map(data => {
        const productsArray:Array<IProduct>=[];
        const i:number=1;
        for (const id in data){
          console.log(data)
            productsArray.push(data[id])
        }
        return productsArray;
      })
    )
  }
```

product-card.component.ts
```
@Input() product : IProduct
```


## Step 18: reactive form

create login

in app.module.ts
to enable rective form by adding ReactiveFormsModule 
note: FormsModule for template form
```
import { ReactiveFormsModule } from '@angular/forms';

 imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ]
```

in login.component.ts
```
  import { FormGroup } from '@angular/forms';
  registrationForm! :FormGroup;
  
 ngOnInit(): void {

    this.registrationForm = new FormGroup({
      userName: new FormControl()
    });
  }

```

note: 
FormGroup - > wrapper around collection of multiple form conttrols and it helps to track the value and validation status of each control added under this calss


bind html form with registration form using formControlName
in login.component.html
```
 <form id="RegForm" #RegForm [formGroup]="registrationForm" (ngSubmit)="onRegSubmit()">			

```

## Step 19: add validation in form control

login.component.ts
```
this.registrationForm = new FormGroup({
      username: new FormControl("Default",Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email])
});
 
```
in login.component.html
```
 <input type="email" placeholder="Email"formControlName=email>
```

## Step 20: cross field validation to validate password and confirmedpassword are matching

create custom validator
in login.component.ts
```
 passowrdmatchingValidator(fg: FormGroup): Validators {
    return fg.get('password')?.value===fg.get('conformedpassword')?.value? false  :{ nomatched: true };
  }
```
pass passowrdmatchingValidator 
``` 
 ngOnInit(): void {

    this.registrationForm = new FormGroup({
      username: new FormControl("Default",Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      conformedpassword: new FormControl(null,[Validators.required]),
      mobileNo: new FormControl(null,[Validators.required,Validators.maxLength(10)])
    }, this.passowrdmatchingValidator);
```

## Step 20: Span to display validation error
in login.component.html
```
<span *ngIf="!registrationForm.get('username').valid && registrationForm.get('username').touched">
```

display multiple error message
```
<span  *ngIf="!email.valid && email.touched" class="error-block">
  <span *ngIf="email.hasError('required')">
	  Please provide email Id
  </span>
  <span *ngIf="email.hasError('email')">
	Please provide valid email Id
  </span>
</span>
```
for conformedpassword  custome validation
```
<span  *ngIf="!conformedpassword.valid && conformedpassword.touched" class="error-block">
  <span *ngIf="conformedpassword.hasError('required')">
	Please confirmed password
  </span>
</span>
<span *ngIf="registrationForm.hasError('nomatched') && conformedpassword.valid">
  password not matched
</span>
```


in below in assets/forms.css and 
```
.ng-invalid .ng-touched{
  border-color: red;
}
.error-block{
  color: red !important;
}
```
import in styles.css
```
@import 'assets/forms.css'
```

## Step 20: reuse code

in in login.component.html, below is repeating 
registrationForm.get('username')

so create below in component class login.component.ts

```
  get username(){
    return this.registrationForm.get('username') as FormControl;
  }
```
and reuse in html as below
```
<span *ngIf="!username.valid && username.touched" class="error-block">
  Please provide username
</span>
```

## Step 20: save data into local storage

Form builder to create forms
in login.component.ts
```
ngOnInit(): void {
	this.createRegistrationForm();
}
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      username:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8)]],
      conformedpassword: [null,[Validators.required]],
      mobileNo: [null,[Validators.required,Validators.maxLength(10)]]
    },{validators:this.passowrdmatchingValidator})
  }
```

## Step 20.1 : using local storage
in login.component.ts
```
 user : any={};
 ```
 assign one object to another object
 ```
  onRegSubmit(){
    console.log(this.registrationForm.value);
    this.user=Object.assign(this.user,this.registrationForm.value)
    this.addUser(this.user)
  }
  
  
    addUser(user:any){

    let users=[];
    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users'));
      users=[users,...users]
    } else{
      users=[user]
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }
 ```
... is spread sperator

## Step 20.2 : add user service
```
ng g s login/services/user
```
in app.module.ts
```
import {UserService } from './login/services/user.service';
 providers: [ProductService, UserService],
```
in user.service.ts
```

  addUser(user:any){

    let users=[];
    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users'));
      users=[users,...users]
    } else{
      users=[user]
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }
```

inject user service into login.component.ts

```
constructor(private fb: FormBuilder, private userService:UserService) { }

  onRegSubmit(){
    console.log(this.registrationForm.value);
    this.user=Object.assign(this.user,this.registrationForm.value);
    this.userService.addUser(this.user)
    this.registrationForm.reset();
  }
```


## Step 20.3 : validate form on submit
in login.component.ts
```
regFormSubmitted : boolean=false;

onRegSubmit(){

    console.log(this.registrationForm.value);
    this.regFormSubmitted =true;
    if(this.registrationForm.valid){
      this.user=Object.assign(this.user,this.registrationForm.value);
      this.userService.addUser(this.user)
      this.registrationForm.reset();
	  this.regFormSubmitted =false;
    }
  }

```

in html
```
  <span *ngIf="!username.valid && (username.touched || regFormSubmitted)" class="error-block">
```

## Step 20.3 : add registration model
```
ng g interface login/model/registration

export interface Registration {
  username:string,
  email:string,
  password: string,
  mobileNo:number
}
```
in login.component.ts
```
import { Registration }  from './model/registration'
registrationModel! : Registration;

  registrationdata(): Registration{
    return this.registrationModel= {
      username: this.username.value,
      email:this.email.value,
      password: this.password.value,
      mobileNo: this.mobileNo.value
    }
  }
 
 in onRegSubmit add below
 this.userService.addUser(this.registrationData);
```

in user.service.ts
```
import { Registration }from  '../model/registration'

 addUser(registrationModel:Registration){
```

## Step 21: Add alertify notifications as service
ref : https://alertifyjs.com/guide.html
```
npm install alertifyjs --save
```
add into angular.json
```
 "node_modules/alertifyjs/build/css/alertify.min.css"
  "node_modules/alertifyjs/build/alertify.min.js"
```
in login.component.ts
```
import *  as alertify  from   'alertifyjs';

```
create src/alertifytype.d.ts add 
```
declare module 'alertifyjs';
```
add alertifytype.d.ts in tsconfig.app.json
```
"include": [
    "src/**/*.d.ts",
    "src/alertifytype.d.ts"
  ]

```

in login.component.ts
```
alertify.success("You are successfully Registered");
```

## Step 21: wrap alertyfy in a service 

```
ng g s services/alertify

```
in alertify.service.ts
```
success(message:string){
    alertify.success(message);
  }
  warning(message:string){
    alertify.warn(message);
  }
  error(message:string){
    alertify.console.error();
    (message);
  }
```
in app module	
```
import {AlertifyService } from './services/alertify.service';
  providers: [ProductService, UserService, AlertifyService],
```
in login.component.ts
```
  constructor(private fb: FormBuilder, private userService:UserService, private alertifyService:AlertifyService) { }
 this.alertifyService.success("You are successfully Registered");
```

## Step 22:login and logout 

login template driven form

in app.module.ts
to enable template form by adding FormsModule
```
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

 imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
```
login.component.html
```
<!--		<form id="LoginForm" #loginForm='ngForm' (ngSubmit)="onLoginSubmit(loginForm)">
            <input type="text" placeholder="Username"  required ngModel name="username">
            <input type="password" placeholder="password" required ngModel name="password">
            <button type="submit" [disabled]="!loginForm.value" class="btn">Login</button>
            <button type="button" class="btn">Cancel</button>
            <a href=""> Forget password</a>
          </form>-->
		  
```
reactive form
```

```

in login.component.ts
```
  createLoginForm(){
    this.newloginForm =this.fb.group({
      username:[null,Validators.required],
      password:[null,Validators.required]
    })
  }
```


## Step 22.1: Add authenticationn service
```
ng g service /login/services/authentication
ng g interface login/model/user
```
in user.ts
```
export interface User {
  username:string,
  password:string
}
```
in login.component.ts
```
  userData(): User{
    return this.userModel= {
      username: this.username.value,
      password: this.password.value,
    }
  }
```
in authentication.service.ts
```
  authenticateUser(user:any){
    let userArray=[];
    if(localStorage.getItem('Users')){
      userArray=JSON.parse(localStorage.getItem('Users') || '{}');
    }
    return userArray.find(p=> p.username===user.username && p.password===user.password);
  }
```
add in app.module.ts
```
import {AuthenticationService } from './login/services/authentication.service';
 providers: [ProductService, UserService, AlertifyService, AuthenticationService],
```

in login.component.ts
```
 constructor(private fb: FormBuilder, private userService:UserService, 
    private alertifyService:AlertifyService, private AuthService:AuthenticationService) { }

 onLoginSubmit(){
    console.log(this.newloginForm.value);
    const user= this.authService.authenticateUser(this.newloginForm);
    if(user){
      this.alertifyService.success("Login Success");
    } else{
      this.alertifyService.error("Login not successfull");
    }
  }
```

## Step 22.2: hide login button if user is already logged in and display logout button
in nav-bar.component.ts
```
  loggedin(){
    return localStorage.getItem('token');
  }
  onLogout(){
    localStorage.removeItem('token');
  }

```
in nav-bar.component.html
```
      <ul>
          <li><a href="cart.html"><i class="fa fa-shopping-basket"></i>Cart</a></li>
          <li *ngIf="!loggedin()"><a href="account.html">Sign Up</a></li>
          <li *ngIf="!loggedin()" ><a routerLink="/login">Log In</a></li>
          <li *ngIf="loggedin()"><a (click)="onLogout()" >Log Out</a></li>
      </ul>
```

## Step 22.3:  redirect to home page on successfull login 

in login.component.ts inject router
```
constructor(private fb: FormBuilder, private userService:UserService,
    private alertifyService:AlertifyService, private authService:AuthenticationService,
    private router:Router) { }
```
in onLoginSubmit(){ method 
```
this.router.navigate(['/']);
```

## Step 22.3: add drop down link using ngx bootstrap
ref: https://valor-software.com/ngx-bootstrap/#/documentation#getting-started
https://valor-software.com/ngx-bootstrap/#/dropdowns
```
npm install ngx-bootstrap --save

```
in  app.module.ts
```
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
	BsDropdownModule.forRoot()
  ],
```
in nav-bar.component.html

```
<span dropdown (onShown)="onShown()" (onHidden)="onHidden()" (isOpenChange)="isOpenChange()">
  <a href id="basic-link" dropdownToggle (click)="false"
     aria-controls="basic-link-dropdown">Click me for a dropdown, yo!</a>
  <ul id="basic-link-dropdown" *dropdownMenu class="dropdown-menu"
      role="menu" aria-labelledby="basic-link">
    <li *ngFor="let choice of items">
      <a class="dropdown-item" href="#">{{choice}}</a>
    </li>
  </ul>
</span>
```
in nav-bar.component.ts
```
 items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
 
  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
```

## Step 23: Route resolver
If any error comes in service then first detail page is displayed and then routed to home page.
To avoid this we use route resolver

ref: https://angular.io/api/router/Resolve
https://dzone.com/articles/understanding-angular-route-resolvers-by-example



in product.service.ts
```
 getproductById(id:number){
    return this.getAllProducts().pipe(
      map(
        array=>{
          throw new Error("some error occured");
          return array.find(p=>p.id===id)
        }
      )
    )
 }
```
in  product-detail.component.ts
```
import {IProduct} from '../interface/iproduct'
constructor(private route:ActivatedRoute, private router:Router, private productService:ProductService) {

    this.route.params.subscribe(
      (params) =>{
        this.productId=+params['id'];
        console.log(this.productId)
        this.productService.getproductById(this.productId).subscribe(
          data=>{
            console.log(data);
          }, error =>{
            console.log(error);
            this.router.navigate(['/'])
          }
        )
      }
    )
```

```
ng g service product/resolver/product-detail
```

in app.module.ts
```
import {  ProductDetailResolverService  } from './product/resolver/product-detail-resolver.service'
providers: [ProductService, UserService, AlertifyService, AuthenticationService
  ,ProductDetailResolverService]
```

```
ng g class product/model/product

export class Product implements  IProduct{
  "id": number;
  "type": string;
  "price": string;
  "imageUrl": string;
}
```

in app.module.ts
```
  {path:'product-detail/:id', component: ProductDetailComponent, resolve:{prp:ProductDetailResolverService}},

 
```
in product-detail.component.ts
```
   this.route.data.subscribe(
      (data)=>{
        this.productId=data['prp'];
      }
   );
```
in product.service.ts
```
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
```

forward to error page instead  of product detail page in case of error
in product-detail-resolver.service.ts
```
 constructor(private router:Router, private productService:ProductService) { }
 
   resolve(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<Product>|Product{
    const prodId = route.params['id'];
    console.log('ProductDetailResolverService');
    return this.productService.getproductById(+prodId).pipe(
      catchError(error=>{
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
```
throw error in  
in product.service.ts
```
 getproductById(id:number){
    return this.getAllProducts().pipe(
      map(
        array=>{
          throw new Error("some error occured");
          return array.find(p=>p.id===id)
        }
      )
    )
 }
```

## Step 24 : NgxGallery
https://github.com/kolkov/ngx-gallery



## Step 24:  Add Filtering and Sorting using angular pipes

pipes
ref: 
https://angular.io/api

in product-list.component.ts
```
Today= new Date();
```
in product-list.component.html
```
Current Date : {{Today |date:'fullDate'}}
```

## Step 24.1:custom pipe for filtering
```
ng g pipe pipe/filter

```
in filter.pipe.ts
```
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

transform(value: any[], filterString: String, propName: string): unknown {
    const resultArray = [];
    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
```
in product-list.component.html
```
<div *ngFor="let property of Properties|filter:'Tshirt':'type'" class="col-md-3">
```

## Step 24.2:custom pipe for sorting
```
ng g pipe pipes/sort
```
in SortPipe
```
  transform(value: Array<string>, ...args: any[]): any {
    const argsValues = args[0];
    const sortField =argsValues[0];
    const sortDirection =argsValues[1];
    let multiplier = 1;
    if(sortDirection ==='desc'){
      multiplier=-1;
    }
    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0
      }
    });
    return value;
  }

```
in app.module.ts
```
import { SortPipe } from './pipes/sort.pipe'
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
```

in product-list.component.html

sortbased on price
```
    <div *ngFor="let property of Properties|filter:'':'type'|sort:['type','desc']" class="col-md-3">

```

## Step 24.2: :filetr  : accept parameter from user fro UI
in product-list.component.ts
add a variable with default value
```
  type='';
  searchType='';
 

  onTypeFilter(){
    this.searchType=this.type;
  }
  onTypeFilterClear(){
    this.searchType='';
	this.type='';
  }


```
in product-list.component.html
add filter:searchType
```
    <div>
      <label>Filter Type</label>
      <input [(ngModel)]='type'>
      <button type="button" (click)="onTypeFilter()" class="btn btn-secondary">Search</button>
      <button type="button" (click)="onTypeFilterClear()" class="btn btn-secondary">Clear</button>
    </div>
	
     <div *ngFor="let property of Properties|filter:searchType:'type'|sort:['price','desc']" class="col-md-3">


```
## Step 24.3: :sort dropdown and sortDirection

in product-list.component.ts

```
SortByParam='';
sortDirection='desc';
  onSortDirection(){
    console.log(this.sortDirection);
    if (this.sortDirection==='desc'){
      this.sortDirection='asc';
    } else if (this.sortDirection==='asc'){
      this.sortDirection='desc';
    }
  }
```
in product-list.component.html
add sort:[SortByParam,sortDirection]
```
    <label>sort by </label>
      <select [(ngModel)]='SortByParam'>
        <option value="type">Type</option>
        <option value="price">Price</option>
      </select>
    <div *ngFor="let property of Properties|filter:searchType:'type'|sort:[SortByParam,sortDirection]" class="col-md-3">
  
   
   
```







## Helpful commands
```
npm install -g @angular/cli
ng new newphysioapp --strict
ng serve --open

ng build --prod
```

## Reference:
- Setting up the local environment and workspace : https://angular.io/guide/setup-local
- angulatr blog : https://blog.angular.io/
- https://youtu.be/ufyyhFye7MQ
- Fontawesome : 
  '''
   https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
   https://fontawesome.com/v4.7.0/icons/
  ```
- https://nodejs.org/en/about/
- https://stackblitz.com/

- Angular  work space : https://angular.io/guide/glossary#workspace 
- scrict mode : https://angular.io/guide/strict-mode
- FireBase and material :  https://firebase.google.com/
- https://material.angular.io
- https://www.techiediaries.com/angular/angular-9-tutorial-and-example/
- https://alertifyjs.com/guide.html
- https://ourcodeworld.com/articles/read/52/top-10-best-notification-libraries-and-plugins-for-javascript-and-jquery
- https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
- https://angular.io/guide/setup-local

## Next 
```
Using Service and HTTP calls in Angular 9   -TODO
https://www.youtube.com/watch?v=YSfY7DcfDQM&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=10
Modify HTTP Data using Pipe -TODO
https://www.youtube.com/watch?v=JuJgWSI8sMc&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=11
Understand Routing - Part 3
https://www.youtube.com/watch?v=VQnZMWTFn88&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=14
Services
https://youtu.be/YSfY7DcfDQM
Modify HTTP Data using Pipe
https://www.youtube.com/watch?v=JuJgWSI8sMc&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=11
Reactive Forms in angular
https://www.youtube.com/watch?v=6aOg_IMQjyE&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=16

Save Data to Local Storage in Angular
https://www.youtube.com/watch?v=UNyZ90hoAHw&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=18
Add alertify notifications as service
https://www.youtube.com/watch?v=y6tk5rfIQk0&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=19
Add Login Logout Functionality
https://www.youtube.com/watch?v=IZ2sNAXROPM&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=20


Add Route Resolver and Image Gallery
https://www.youtube.com/watch?v=uR0oB2-BDNE&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=26
Add Filtering and Sorting using angular pipes
https://www.youtube.com/watch?v=FoazvbvWL4A&list=PL_NVFNExoAxclqXo9fLAeP0G2Qp56Fu8C&index=27

```

